<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// ============================================
// ROTAS DA API
// ============================================

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Pages
Route::group(['prefix' => 'pages'], function () {
    Route::get('/', [App\Http\Controllers\Api\PageController::class, 'index']);
    Route::get('/{page:slug}', [App\Http\Controllers\Api\PageController::class, 'show']);
});

// Banners
Route::group(['prefix' => 'banners'], function () {
    Route::get('/', [App\Http\Controllers\Api\BannerController::class, 'index']);
});

// Products
Route::group(['prefix' => 'products'], function () {
    Route::get('/', [App\Http\Controllers\Api\ProductController::class, 'index']);
    Route::get('/{language}/{slug}', [App\Http\Controllers\Api\ProductController::class, 'show']);
});

// Segments
Route::group(['prefix' => 'segments'], function () {
    Route::get('/', [App\Http\Controllers\Api\SegmentController::class, 'index']);
});

// Blog
Route::group(['prefix' => 'blog'], function () {
    Route::get('/', [App\Http\Controllers\Api\BlogController::class, 'index']);
    Route::get('/categories', [App\Http\Controllers\Api\BlogController::class, 'categories']);
    Route::get('/{post}', [App\Http\Controllers\Api\BlogController::class, 'show']);
    
    // Rotas de comentários
    Route::get('/{post}/comments', [App\Http\Controllers\Api\CommentController::class, 'index']);
    Route::post('/{post}/comments', [App\Http\Controllers\Api\CommentController::class, 'store']);
});

// Menus
Route::group(['prefix' => 'menus'], function () {
    Route::get('/', [App\Http\Controllers\Api\MenuController::class, 'index']);
    
    Route::group(['prefix' => '{menu}'], function () {
        Route::get('/', [App\Http\Controllers\Api\MenuController::class, 'show']);
    });
});

// Newsletter
Route::group(['prefix' => 'newsletter'], function () {
    Route::post('/', [App\Http\Controllers\Api\NewsletterController::class, 'store']);
});

// Config
Route::group(['prefix' => 'config'], function () {
    Route::get('/', [App\Http\Controllers\Api\ConfigurationController::class, 'index']);
});

// Budget
Route::group(['prefix' => 'budget'], function () {
    Route::post('/', [App\Http\Controllers\Api\BudgetController::class, 'store']);
});

// Contact
Route::group(['prefix' => 'contact'], function () {
    Route::post('/', [App\Http\Controllers\Api\ContactController::class, 'store']);
});
Route::get('/fix-images', function() {
    $count = \DB::table('products')
        ->where('image', 'like', '%energetic-love%')
        ->update([
            'image' => \DB::raw("REPLACE(image, 'https://energetic-love-production.up.railway.app/storage/', 'http://159.89.230.73/storage/')")
        ]);
    
    return response()->json([
        'success' => true,
        'produtos_atualizados' => $count,
        'mensagem' => 'URLs das imagens atualizadas!'
    ]);
});
Route::get('/check-images', function() {
    $products = \DB::table('products')
        ->whereNotNull('image')
        ->where('image', '!=', '')
        ->select('id', 'image')
        ->get();
    
    return response()->json($products);
});
Route::get('/fix-images-v2', function() {
    $products = \DB::table('products')
        ->whereNotNull('image')
        ->where('image', '!=', '')
        ->whereNot('image', 'like', 'http%')
        ->get();

    $count = 0;
    foreach ($products as $product) {
        \DB::table('products')
            ->where('id', $product->id)
            ->update([
                'image' => 'http://159.89.230.73/storage/' . $product->image
            ]);
        $count++;
    }

    return response()->json([
        'success' => true,
        'produtos_atualizados' => $count,
        'mensagem' => 'URLs completas adicionadas!'
    ]);
});
// ========================================
// ROTA PARA SINCRONIZAR IMAGENS DO CLOUDINARY
// ========================================
Route::get('/sync-cloudinary', function() {
    $cloudName = 'dtdzvmniu';
    
    $updated = [
        'products' => 0,
        'pages' => 0,
        'banners' => 0,
        'media' => 0
    ];
    
    // ==========================================
    // ATUALIZAR PRODUTOS
    // ==========================================
    $products = \DB::table('products')
        ->whereNotNull('image')
        ->where('image', '!=', '')
        ->get();
    
    foreach ($products as $product) {
        $filename = basename($product->image);
        $cloudinaryUrl = "https://res.cloudinary.com/{$cloudName}/image/upload/v1/products/{$filename}";
        
        \DB::table('products')
            ->where('id', $product->id)
            ->update(['image' => $cloudinaryUrl]);
        
        $updated['products']++;
    }
    
    // ==========================================
    // ATUALIZAR PÁGINAS (custom_fields_data)
    // ==========================================
    $pages = \DB::table('pages')
        ->whereNotNull('custom_fields_data')
        ->get();
    
    foreach ($pages as $page) {
        $customFields = json_decode($page->custom_fields_data, true);
        $changed = false;
        
        if ($customFields) {
            array_walk_recursive($customFields, function(&$value) use ($cloudName, &$changed) {
                if (is_string($value) && strpos($value, '/storage/') !== false) {
                    $filename = basename($value);
                    $value = "https://res.cloudinary.com/{$cloudName}/image/upload/v1/pages/{$filename}";
                    $changed = true;
                }
            });
            
            if ($changed) {
                \DB::table('pages')
                    ->where('id', $page->id)
                    ->update(['custom_fields_data' => json_encode($customFields)]);
                
                $updated['pages']++;
            }
        }
    }
    
    // ==========================================
    // ATUALIZAR BANNERS
    // ==========================================
    $banners = \DB::table('banners')
        ->whereNotNull('image')
        ->where('image', '!=', '')
        ->get();
    
    foreach ($banners as $banner) {
        $filename = basename($banner->image);
        $folder = strpos($banner->image, '/pages/') !== false ? 'pages' : 'products';
        $cloudinaryUrl = "https://res.cloudinary.com/{$cloudName}/image/upload/v1/{$folder}/{$filename}";
        
        \DB::table('banners')
            ->where('id', $banner->id)
            ->update(['image' => $cloudinaryUrl]);
        
        $updated['banners']++;
    }
    
    // ==========================================
    // ATUALIZAR MEDIA
    // ==========================================
    $medias = \DB::table('media')
        ->whereNotNull('file_name')
        ->where('file_name', '!=', '')
        ->get();
    
    foreach ($medias as $media) {
        $filename = basename($media->file_name);
        $folder = strpos($media->file_name, '/pages/') !== false ? 'pages' : 'products';
        $cloudinaryUrl = "https://res.cloudinary.com/{$cloudName}/image/upload/v1/{$folder}/{$filename}";
        
        \DB::table('media')
            ->where('id', $media->id)
            ->update(['file_name' => $cloudinaryUrl]);
        
        $updated['media']++;
    }
    
    return response()->json([
        'success' => true,
        'message' => 'Todas as imagens atualizadas!',
        'detalhes' => $updated,
        'total' => array_sum($updated)
    ]);
});
