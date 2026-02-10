<?php

echo "🚀 Iniciando migração de imagens para Cloudinary...\n\n";

// Configurações Cloudinary
$cloudName = 'dtdzvmniu';
$apiKey = '928973282772645';
$apiSecret = 'L4CvqTYy5xVkx9hHiCyDumLLlG0';

// Configurações do banco Railway
$dbHost = 'yamabiko.proxy.rlwy.net';
$dbPort = '43943';
$dbName = 'railway';
$dbUser = 'root';
$dbPass = 'yhGYYYUvDlZMpQpHOnOjMMvIRmoVZMGf';

// Servidor antigo onde estão as imagens
$oldServer = 'http://159.89.230.73';

// Conectar ao banco
try {
    $pdo = new PDO(
        "mysql:host=$dbHost;port=$dbPort;dbname=$dbName;charset=utf8mb4",
        $dbUser,
        $dbPass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    echo "✅ Conectado ao banco de dados\n\n";
} catch (PDOException $e) {
    die("❌ Erro ao conectar: " . $e->getMessage() . "\n");
}

// Buscar produtos com imagens
$stmt = $pdo->query("SELECT id, image FROM products WHERE image IS NOT NULL AND image != ''");
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo "📦 Encontrados " . count($products) . " produtos com imagens\n\n";

$migrated = 0;
$errors = 0;

foreach ($products as $product) {
    $productId = $product['id'];
    $imageUrl = $product['image'];
    
    // Extrair apenas o nome do arquivo
    $imagePath = parse_url($imageUrl, PHP_URL_PATH);
    $fileName = basename($imagePath);
    
    // Montar URL completa do servidor antigo
    $fullImageUrl = $oldServer . $imagePath;
    
    echo "📸 Produto #{$productId}: {$fileName}\n";
    echo "   URL antiga: {$fullImageUrl}\n";
    
    // Baixar imagem
    $imageData = @file_get_contents($fullImageUrl);
    
    if ($imageData === false) {
        echo "   ❌ Erro ao baixar imagem\n\n";
        $errors++;
        continue;
    }
    
    echo "   ✅ Imagem baixada (" . strlen($imageData) . " bytes)\n";
    
    // Upload para Cloudinary
    $timestamp = time();
    $publicId = 'products/' . pathinfo($fileName, PATHINFO_FILENAME);
    
    $signature = sha1("public_id={$publicId}&timestamp={$timestamp}{$apiSecret}");
    
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => "https://api.cloudinary.com/v1_1/{$cloudName}/image/upload",
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => [
            'file' => 'data:image/png;base64,' . base64_encode($imageData),
            'public_id' => $publicId,
            'api_key' => $apiKey,
            'timestamp' => $timestamp,
            'signature' => $signature
        ],
        CURLOPT_RETURNTRANSFER => true,
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200) {
        $result = json_decode($response, true);
        $newUrl = $result['secure_url'];
        
        echo "   ✅ Upload para Cloudinary: OK\n";
        echo "   🔗 Nova URL: {$newUrl}\n";
        
        // Atualizar no banco
        $updateStmt = $pdo->prepare("UPDATE products SET image = ? WHERE id = ?");
        $updateStmt->execute([$newUrl, $productId]);
        
        echo "   ✅ Banco de dados atualizado\n\n";
        $migrated++;
    } else {
        echo "   ❌ Erro no upload: HTTP {$httpCode}\n";
        echo "   Resposta: {$response}\n\n";
        $errors++;
    }
    
    // Pausa para não sobrecarregar
    usleep(500000); // 0.5 segundo
}

echo "\n✨ Migração concluída!\n";
echo "✅ Migradas: {$migrated}\n";
echo "❌ Erros: {$errors}\n";
