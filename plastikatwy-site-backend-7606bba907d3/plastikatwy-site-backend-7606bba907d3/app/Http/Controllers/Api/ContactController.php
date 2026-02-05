<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ContactMail;
use App\Models\Configuration;
use App\Models\Newsletter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $config = Configuration::query()->first();

        $sector = current($this->findSectorByName($config->sectors, $request->sector));

        $email = data_get($sector, 'sectors.email', 'vendas@alcast.com.br');

        Mail::to($email)->send(new ContactMail($request->all()));

        $acceptNewsletter = $request->get('accept_newsletter', 'no');

        if ($acceptNewsletter == 'yes') {
            Newsletter::query()
                ->create([
                    'email' => $request->email,
                ]);
        }

        return response()->json([
            'message' => 'Contato enviado com sucesso!',
            'success' => true,
        ]);
    }

    function findSectorByName($sectors, $searchTerm) {
        return array_filter($sectors, function($item) use ($searchTerm) {
            return in_array($searchTerm, $item['sectors']['name'], true);
        });
    }
}
