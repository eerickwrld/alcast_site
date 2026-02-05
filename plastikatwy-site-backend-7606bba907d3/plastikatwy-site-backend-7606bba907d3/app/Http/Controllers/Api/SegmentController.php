<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Segment;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class SegmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $isQuotationPage = $request->query('quotation', null);

        $segments = QueryBuilder::for(Segment::class)
            ->when($request->has('limit'), fn($query) => $query->limit($request->limit))
            ->get();

        foreach ($segments as $segment) {
            $segment->image = $segment->getUrlImage();
        }

        if ($isQuotationPage) {
            $otherSegments = [
                "id" => 'others',
                "slug" => 'others',
                "name" => [
                    "pt_BR" => "Outros",
                    "en" => "Others",
                    "es" => "Otros"
                ],
            ];

//            $segments = array_merge($segments, $otherSegments);

            return response()->json([
                ...$segments,
                $otherSegments
            ]);
        }

        return response()->json($segments);
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
    public function show(Segment $segment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Segment $segment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Segment $segment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Segment $segment)
    {
        //
    }
}
