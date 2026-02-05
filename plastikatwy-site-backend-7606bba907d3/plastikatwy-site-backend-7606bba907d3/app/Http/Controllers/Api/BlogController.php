<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use App\Models\Post;
use LaraZeus\Sky\Models\Tag;
use Spatie\QueryBuilder\QueryBuilder;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $posts = Post::query()
            ->with('tags', 'tagsTranslated', 'author')
            ->when($request->has('limit'), function ($query, $limit) {
                return $query->limit($limit);
            })
            ->get();
//            ->paginate($request->get('per_page', 10), ['*'], 'page', $request->get('page', 1));

        foreach ($posts as $post) {
            $post->image();
            $post->author->role = "Autor";
        }

//        if ($request->has('category'))
//        {
//            $filteredPosts = [];
//            foreach ($posts as $post){
//                if ($post->tagsTranslated
//                    ->where('type', 'category')
//                    ->where('slug_translated', $request->category)
//                ){
//                    $filteredPosts[] = $post;
//                }
//            }
//
//            $posts = $filteredPosts;
//        }
//
//        foreach ($posts as $post) {
//            $post->image();
//        }

        return response()->json([
            'posts' => $posts,
        ]);
    }
    public function show(Post $post)
    {

        $post->load('tags', 'author');
        $post->image();
        $post->author->role = "Autor";

        return response()->json($post);
    }

    public function categories(Request $request)
    {
        $categories = Tag::query()
            ->where('type', 'category')
            ->withCount('postsPublished')
            ->get();

        return response()->json([
            'categories' => $categories,
        ]);
    }
}
