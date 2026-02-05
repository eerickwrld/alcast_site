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
        $products = QueryBuilder::for(Product::class)
            ->when($request->has('limit'), fn($query) => $query->limit($request->limit))
            ->get();

        foreach ($products as $product) {
            $product->banner = $product->getUrlBanner();
            $product->images_product_use = $product->getImagesForUse();
            $product->image = $product->getUrlImage();
        }

        return response()->json($products);
    }

    public function show(string $language, string $slug)
    {
        $product = Product::whereJsonContainsLocale('slug', $language, $slug)->first();

        $product->load('segments');

        $product->images_product_use = $product->getImagesForUse();
        $product->banner = $product->getUrlBanner();
        $product->image = $product->getUrlImage();


        return response()->json($product);
    }


}
