<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/upload-images', function() {
    return '<!DOCTYPE html>
<html>
<head>
    <title>Upload de Imagens</title>
    <style>
        body { font-family: Arial; padding: 50px; background: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }
        input[type="file"] { width: 100%; padding: 10px; margin: 20px 0; }
        button { background: #4CAF50; color: white; padding: 15px 30px; border: none; border-radius: 5px; cursor: pointer; }
    </style>
</head>
<body>
    <div class="container">
        <h1>📸 Upload de Imagens</h1>
        <form action="/upload-images" method="POST" enctype="multipart/form-data">
            <input type="hidden" name="_token" value="' . csrf_token() . '">
            <p>Selecione as imagens (pode selecionar várias de uma vez):</p>
            <input type="file" name="images[]" multiple accept="image/*" required>
            <br>
            <button type="submit">🚀 Enviar Imagens</button>
        </form>
    </div>
</body>
</html>';
});

Route::post('/upload-images', function(Request $request) {
    set_time_limit(300); // 5 minutos
    
    if ($request->hasFile('images')) {
        $uploadedCount = 0;
        $errors = [];
        
        foreach ($request->file('images') as $image) {
            try {
                $filename = $image->getClientOriginalName();
                $image->storeAs('public', $filename);
                $uploadedCount++;
            } catch (Exception $e) {
                $errors[] = $filename . ': ' . $e->getMessage();
            }
        }
        
        $html = '<h1>✅ Upload Concluído!</h1>';
        $html .= '<p>✅ <strong>' . $uploadedCount . '</strong> imagens enviadas com sucesso!</p>';
        
        if (count($errors) > 0) {
            $html .= '<h3>❌ Erros:</h3><ul>';
            foreach ($errors as $error) {
                $html .= '<li>' . $error . '</li>';
            }
            $html .= '</ul>';
        }
        
        $html .= '<br><a href="/upload-images">← Voltar</a>';
        
        return $html;
    }
    
    return '❌ Nenhuma imagem foi enviada. <a href="/upload-images">Tentar novamente</a>';
});
