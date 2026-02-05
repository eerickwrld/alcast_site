<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\BudgetMail;
use App\Models\Configuration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class BudgetController extends Controller
{
    public function store(Request $request)
    {
        $config = Configuration::query()->first();

        $mailBudget = data_get($config, 'contact_info.email');
        Mail::to($mailBudget)->send(new BudgetMail($request->userData, $request->items));

        return response()->json([
            'message' => 'Budget sent successfully',
            'success' => true
        ]);
    }
}
