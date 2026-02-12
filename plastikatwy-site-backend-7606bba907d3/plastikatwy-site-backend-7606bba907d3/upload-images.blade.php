<!DOCTYPE html>
<html>
<head>
    <title>Upload de Imagens</title>
</head>
<body>
    <h1>Upload de Imagens</h1>
    <form action="/upload-images" method="POST" enctype="multipart/form-data">
        @csrf
        <input type="file" name="images[]" multiple accept="image/*">
        <br><br>
        <button type="submit">Enviar Imagens</button>
    </form>
</body>
</html>
