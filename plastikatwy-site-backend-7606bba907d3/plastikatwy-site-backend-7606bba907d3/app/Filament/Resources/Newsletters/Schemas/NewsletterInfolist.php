<?php

namespace App\Filament\Resources\Newsletters\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class NewsletterInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('email')
                    ->label('Email'),
                TextEntry::make('created_at')
                    ->label('Criado em')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->label('Atualizado em')
                    ->dateTime(),
            ]);
    }
}
