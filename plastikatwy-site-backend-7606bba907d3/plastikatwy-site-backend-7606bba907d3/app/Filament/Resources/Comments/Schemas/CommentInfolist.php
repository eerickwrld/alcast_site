<?php

namespace App\Filament\Resources\Comments\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class CommentInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('post.title')
                    ->label('Titulo do Post'),
                TextEntry::make('message')
                    ->label('Mensagem')
                    ->columnSpanFull(),
                TextEntry::make('name')
                    ->label('Nome'),
                TextEntry::make('email')
                    ->label('Email'),
                IconEntry::make('is_approved')
                    ->label('Aprovado')
                    ->boolean(),
                TextEntry::make('created_at')
                    ->label('Criado em')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->label('Atualizado em')
                    ->dateTime(),
            ]);
    }
}
