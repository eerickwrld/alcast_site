<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class MenuController extends Controller
{
    /**
     * Retorna a lista de menus.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $menus = Menu::select(['id', 'title', 'slug', 'items', 'created_at', 'updated_at'])
                ->get()
                ->map(function ($menu) {
                    return [
                        'id' => $menu->id,
                        'title' => $menu->title,
                        'slug' => $menu->slug,
                        'created_at' => $menu->created_at->toDateTimeString(),
                        'updated_at' => $menu->updated_at->toDateTimeString(),
                    ];
                });

            return response()->json($menus);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Falha ao listar os menus.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Exibe um menu específico.
     *
     * @param  string  $slug
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($slug, Request $request)
    {
        $language = $request->get('language', 'pt_BR');

        try {
            $menu = Menu::query()
                        ->where('slug', $slug)
                        ->where('language', $language)
                        ->firstOrFail();

            return response()->json($menu);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Menu não encontrado.',
                'error' => $e->getMessage()
            ], 404);
        }
    }
}
