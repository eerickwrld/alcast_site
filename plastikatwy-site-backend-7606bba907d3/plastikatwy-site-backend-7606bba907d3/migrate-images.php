<?php
/**
 * Script de Migração de Imagens para Cloudinary
 * 
 * Este script:
 * 1. Busca todos os produtos da API
 * 2. Baixa imagens do servidor antigo (159.89.230.73)
 * 3. Faz upload para Cloudinary
 * 4. Atualiza URLs no banco de dados MySQL
 */

// Configurações Cloudinary
$cloudinary = [
    'cloud_name' => 'dtdzvmniu',
    'api_key' => '928973282772645',
    'api_secret' => 'L4CvqTYy5xVkx9hHiCyDumLLlG0'
];

// Configurações do Banco de Dados Railway
$db = [
    'host' => 'yamabiko.proxy.rlwy.net',
    'port' => 43943,
    'database' => 'railway',
    'username' => 'root',
    'password' => 'yhGYYYUvDlZMpQpHOnOjMMvIRmoVZMGf'
];

// URL da API
$api_url = 'https://energetic-love-production.up.railway.app/api/products';

echo "🚀 Iniciando migração de imagens para Cloudinary...\n\n";

// Conectar ao banco
try {
    $pdo = new PDO(
        "mysql:host={$db['host']};port={$db['port']};dbname={$db['database']}",
        $db['username'],
        $db['password']
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "✅ Conectado ao banco de dados\n\n";
} catch (PDOException $e) {
    die("❌ Erro ao conectar no banco: " . $e->getMessage() . "\n");
}

// Buscar produtos da API
echo "📡 Buscando produtos da API...\n";
$products_json = file_get_contents($api_url);
$products = json_decode($products_json, true);

if (!$products) {
    die("❌ Erro ao buscar produtos da API\n");
}

echo "✅ Encontrados " . count($products) . " produtos\n\n";

// Função para fazer upload para Cloudinary
function uploadToCloudinary($image_url, $cloudinary) {
    // Baixar imagem temporariamente
    $temp_file = tempnam(sys_get_temp_dir(), 'img_');
    $image_content = @file_get_contents($image_url);
    
    if (!$image_content) {
        echo "   ⚠️  Erro ao baixar: $image_url\n";
        return null;
    }
    
    file_put_contents($temp_file, $image_content);
    
    // Gerar assinatura para Cloudinary
    $timestamp = time();
    $params = [
        'timestamp' => $timestamp,
        'upload_preset' => 'ml_default'
    ];
    
    $signature = sha1(
        'timestamp=' . $timestamp . 
        $cloudinary['api_secret']
    );
    
    // Upload via cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://api.cloudinary.com/v1_1/{$cloudinary['cloud_name']}/image/upload");
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, [
        'file' => new CURLFile($temp_file),
        'api_key' => $cloudinary['api_key'],
        'timestamp' => $timestamp,
        'signature' => $signature
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    unlink($temp_file);
    
    if ($http_code !== 200) {
        echo "   ⚠️  Erro no upload para Cloudinary (HTTP $http_code)\n";
        return null;
    }
    
    $result = json_decode($response, true);
    return $result['secure_url'] ?? null;
}

// Processar cada produto
$total_images_migrated = 0;

foreach ($products as $product) {
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    echo "📦 Produto: {$product['name']['pt_BR']} (ID: {$product['id']})\n";
    
    $images_to_update = [];
    
    // Processar imagem principal
    if (!empty($product['image']) && strpos($product['image'], 'energetic-love-production.up.railway.app') !== false) {
        $old_url = str_replace('energetic-love-production.up.railway.app', '159.89.230.73', $product['image']);
        echo "  📸 Migrando imagem principal...\n";
        echo "     Origem: $old_url\n";
        
        $new_url = uploadToCloudinary($old_url, $cloudinary);
        
        if ($new_url) {
            $images_to_update['image'] = $new_url;
            echo "     ✅ Novo: $new_url\n";
            $total_images_migrated++;
        }
    }
    
    // Processar banner
    if (!empty($product['banner']) && strpos($product['banner'], 'energetic-love-production.up.railway.app') !== false) {
        $old_url = str_replace('energetic-love-production.up.railway.app', '159.89.230.73', $product['banner']);
        echo "  🎨 Migrando banner...\n";
        echo "     Origem: $old_url\n";
        
        $new_url = uploadToCloudinary($old_url, $cloudinary);
        
        if ($new_url) {
            $images_to_update['banner'] = $new_url;
            echo "     ✅ Novo: $new_url\n";
            $total_images_migrated++;
        }
    }
    
    // Processar imagens de uso
    if (!empty($product['images_product_use'])) {
        $new_images_use = [];
        
        foreach ($product['images_product_use'] as $index => $image_url) {
            if (strpos($image_url, 'energetic-love-production.up.railway.app') !== false) {
                $old_url = str_replace('energetic-love-production.up.railway.app', '159.89.230.73', $image_url);
                echo "  🖼️  Migrando imagem de uso #" . ($index + 1) . "...\n";
                echo "     Origem: $old_url\n";
                
                $new_url = uploadToCloudinary($old_url, $cloudinary);
                
                if ($new_url) {
                    $new_images_use[] = $new_url;
                    echo "     ✅ Novo: $new_url\n";
                    $total_images_migrated++;
                } else {
                    $new_images_use[] = $image_url; // Manter URL antiga se falhar
                }
            } else {
                $new_images_use[] = $image_url;
            }
        }
        
        if (!empty($new_images_use)) {
            $images_to_update['images_product_use'] = json_encode($new_images_use);
        }
    }
    
    // Atualizar banco de dados
    if (!empty($images_to_update)) {
        try {
            $set_clauses = [];
            $params = [];
            
            foreach ($images_to_update as $field => $value) {
                $set_clauses[] = "$field = ?";
                $params[] = $value;
            }
            
            $params[] = $product['id'];
            
            $sql = "UPDATE products SET " . implode(', ', $set_clauses) . " WHERE id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            
            echo "  💾 Banco atualizado!\n";
        } catch (PDOException $e) {
            echo "  ❌ Erro ao atualizar banco: " . $e->getMessage() . "\n";
        }
    }
    
    echo "\n";
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "🎉 Migração concluída!\n";
echo "📊 Total de imagens migradas: $total_images_migrated\n";
echo "\n";
echo "✅ Todas as URLs foram atualizadas para Cloudinary!\n";
echo "🌐 Teste agora: https://energetic-love-production.up.railway.app/api/products\n";





