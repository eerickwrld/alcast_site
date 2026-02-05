<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class BannerController extends Controller
{
    public function index()
    {
        $banners = QueryBuilder::for(Banner::class)
            ->get(); //Banner::active()->get();

        return response()->json($banners);
    }
}
