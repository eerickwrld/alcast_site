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
