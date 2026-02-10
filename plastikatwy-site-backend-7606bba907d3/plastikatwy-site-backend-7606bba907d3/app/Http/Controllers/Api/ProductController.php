<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Models\Product;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        try {
            $products = QueryBuilder::for(Product::class)
                ->when($request->has('limit'), fn($query) => $query->limit($request->limit))
                ->get();

            // Se não há produtos, retorna array vazio
            if ($products->isEmpty()) {
                return response()->json([]);
            }

            foreach ($products as $product) {
                try {
                    $product->banner = $product->getUrlBanner();
                    $product->images_product_use = $product->getImagesForUse();
                    $product->image = $product->getUrlImage();
                } catch (\Exception $e) {
                    // Se der erro ao processar um produto específico, continua
                    \Log::warning("Erro ao processar produto {$product->id}: " . $e->getMessage());
                }
            }

            return response()->json($products);
            
        } catch (\Exception $e) {
            // Log do erro
            \Log::error('Erro ao buscar produtos: ' . $e->getMessage());
            
            // Retorna array vazio ao invés de erro 500
            return response()->json([]);
        }
    }

    public function show(string $language, string $slug)
    {
        try {
            $product = Product::whereJsonContainsLocale('slug', $language, $slug)->first();

            // Se não encontrou o produto
            if (!$product) {
                return response()->json(['error' => 'Produto não encontrado'], 404);
            }

            $product->load('segments');
            $product->images_product_use = $product->getImagesForUse();
            $product->banner = $product->getUrlBanner();
            $product->image = $product->getUrlImage();

            return response()->json($product);
            
        } catch (\Exception $e) {
            \Log::error('Erro ao buscar produto: ' . $e->getMessage());
            return response()->json(['error' => 'Erro ao buscar produto'], 500);
        }
    }
}
