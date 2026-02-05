<?php

namespace App\Filament\Resources\Segments\Schemas;

use Filament\Forms\Components\Repeater;
use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\RepeatableEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Flex;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Schema;

class SegmentInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('name')
                    ->label('Nome'),
                TextEntry::make('description')
                    ->label('Descrição'),
                TextEntry::make('slug'),
                ImageEntry::make('image')
                    ->label('Imagem'),
                TextEntry::make('created_at')
                    ->label('Criado em')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->label('Atualizado em')
                    ->dateTime(),
                RepeatableEntry::make('images')
                        ->schema([
                            ImageEntry::make('images')
                                ->label('Imagem')
                                ->disk('public'),
                        ])
                        ->label('Imagens')
                        ->columnSpanFull(),
            ]);
    }
}
