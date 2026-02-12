Route::get('/upload-images', function() {
    return '<!DOCTYPE html>
<html>
<head><title>Upload</title></head>
<body>
<h1>Upload de Imagens</h1>
<form action="/upload-images" method="POST" enctype="multipart/form-data">
<input type="hidden" name="_token" value="' . csrf_token() . '">
<input type="file" name="images[]" multiple accept="image/*">
<br><br>
<button type="submit">Enviar Imagens</button>
</form>
</body>
</html>';
});

Route::post('/upload-images', function(\Illuminate\Http\Request $request) {
    if ($request->hasFile('images')) {
        $uploadedCount = 0;
        foreach ($request->file('images') as $image) {
            $filename = $image->getClientOriginalName();
            $image->storeAs('public', $filename);
            $uploadedCount++;
        }
        return "✅ {$uploadedCount} imagens enviadas com sucesso!";
    }
    return "❌ Nenhuma imagem foi enviada.";
});
