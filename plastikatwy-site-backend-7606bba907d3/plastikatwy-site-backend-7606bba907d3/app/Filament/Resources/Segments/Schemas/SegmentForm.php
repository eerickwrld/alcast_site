<?php

namespace App\Filament\Resources\Segments\Schemas;

use AbdulmajeedJamaan\FilamentTranslatableTabs\TranslatableTabs;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class SegmentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Nome')
                    ->required()
                    ->translatableTabs(),
                TextInput::make('description')
                    ->label('Descrição')
                    ->translatableTabs(),
                FileUpload::make('image')
                    ->label('Imagem')
                    ->disk('public')
                    ->belowContent('Tamanho recomendado: 1000×1000px.')
                    ->image()
                    ->required(),
//                Toggle::make('active')
//                    ->label('Ativo')
//                    ->required(),
                Repeater::make('images')
                    ->label('Imagens')
                    ->schema([
                        FileUpload::make('images')
                            ->label('Imagem')
                            ->disk('public')
                            ->belowContent('Tamanho recomendado: 1000×1000px.')
                            ->image()
                    ])
                    ->required()
                    ->columnSpanFull()
            ]);
    }
}
