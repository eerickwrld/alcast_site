<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function index($postId)
    {
        $post = Post::findOrFail($postId);
        $comments = $post->comments()
            ->where('is_approved', true)
            ->orderBy('created_at', 'desc')
            ->with(['replies' => function ($query) {
                $query->where('is_approved', true);
            }])
            ->get();

        return response()->json([
            'success' => true,
            'data' => $comments
        ]);
    }

    public function store(Request $request, $postId)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
            'parent_id' => 'nullable|exists:comments,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $post = Post::findOrFail($postId);

        $comment = new Comment([
            'name' => $request->name,
            'email' => $request->email,
            'message' => $request->message,
            'parent_id' => $request->parent_id,
            'is_approved' => false // Por padrão, os comentários precisam ser aprovados
        ]);

        $post->allComments()->save($comment);

        return response()->json([
            'success' => true,
            'message' => 'Comentário enviado com sucesso! Aguarde a aprovação.',
            'data' => $comment
        ], 201);
    }
}
