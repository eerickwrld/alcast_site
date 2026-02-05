<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ProductInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                ImageEntry::make('image')
                    ->label('Imagem')
                    ->columnSpanFull(),
                TextEntry::make('name')
                    ->label('Nome'),
                Section::make('Descrição')
                    ->schema([
                        TextEntry::make('description')
                            ->label('Descrição')
                            ->columnSpanFull()
                            ->html()
                    ])
                    ->collapsible()
                    ->columnSpanFull(),
                IconEntry::make('status')
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
