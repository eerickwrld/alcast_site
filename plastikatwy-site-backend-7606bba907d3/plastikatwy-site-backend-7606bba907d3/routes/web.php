<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect('admin');
});
use Illuminate\Http\Request;

Route::get('/upload-images', function() {
    return view('upload-images');
});

Route::post('/upload-images', function(Request $request) {
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
