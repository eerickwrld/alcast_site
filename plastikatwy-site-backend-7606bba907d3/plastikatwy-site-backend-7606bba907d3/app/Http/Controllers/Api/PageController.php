<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $pages = QueryBuilder::for(Page::class)
            ->when($request->has('limit'), function ($query, $limit) {
                return $query->limit($limit);
            })
            ->get();

        return response()->json($pages);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($page, Request $request)
    {
        $language = $request->get('language', 'pt_BR');

        $page = Page::query()
            ->where('slug', $page)
            ->where('language', $language)
            ->firstOrFail();

        $baseUrl = asset('storage/');

        // Função para processar recursivamente os dados e adicionar URLs completas às imagens
        $processImages = function (&$data) use (&$processImages, $baseUrl) {
            foreach ($data as $key => &$value) {
                if (is_array($value)) {
                    $processImages($value);
                } elseif (($key === 'image' || $key === 'icon') && is_string($value) && !empty($value)) {
                    // Se for um campo de imagem e tiver um valor
                    $data[$key] = $baseUrl . '/' . ltrim($value, '/');
                } elseif ($key === 'custom_fields_data' && is_array($value)) {
                    // Processa os campos dentro de custom_fields_data
                    foreach ($value as $field => &$fieldValue) {
                        if (in_array($field, ['image', 'icon']) && is_string($fieldValue) && !empty($fieldValue)) {
                            $value[$field] = $baseUrl . '/' . ltrim($fieldValue, '/');
                        }
                    }
                }
            }
        };

        // Converte para array para manipulação
        $pageData = $page->toArray();

        // Processa os dados personalizados
        if (!empty($pageData['custom_fields_data'])) {
            $customFieldsData = $pageData['custom_fields_data'];
            if (is_array($customFieldsData)) {
                $processImages($customFieldsData);
                $pageData['custom_fields_data'] = $customFieldsData;
            }
        }

        return response()->json($pageData);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Page $page)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Page $page)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Page $page)
    {
        //
    }
}
