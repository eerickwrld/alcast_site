<?php

namespace App\Filament\Resources\Menus\Schemas;


use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\ViewEntry;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section as InfolistSection;
use Filament\Schemas\Schema;

class MenuInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Grid::make(2)
                    ->schema([
                        TextEntry::make('title')
                            ->label('Título')
                            ->columnSpan(1),
                        TextEntry::make('slug')
                            ->label('Slug')
                            ->columnSpan(1),
                    ]),

                InfolistSection::make('Links do Menu')
                    ->schema([
                        ViewEntry::make('items')
                            ->view('filament.infolists.components.menu-items')
                            ->label('')
                            ->columnSpanFull(),
                    ])
                    ->collapsible()
                    ->collapsed()
                    ->columnSpanFull(),

//                InfolistSection::make('Seções do Menu')
//                    ->schema([
//                        ViewEntry::make('sections')
//                            ->view('filament.infolists.components.menu-sections')
//                            ->label('')
//                            ->columnSpanFull(),
//                    ])
//                    ->collapsible()
//                    ->collapsed()
//                    ->columnSpanFull(),

                Grid::make(2)
                    ->schema([
                        TextEntry::make('created_at')
                            ->label('Criado em')
                            ->dateTime('d/m/Y H:i:s')
                            ->columnSpan(1),
                        TextEntry::make('updated_at')
                            ->label('Atualizado em')
                            ->dateTime('d/m/Y H:i:s')
                            ->columnSpan(1),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
