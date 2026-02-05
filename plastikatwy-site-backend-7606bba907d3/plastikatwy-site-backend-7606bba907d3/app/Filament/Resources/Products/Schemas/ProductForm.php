<?php

namespace App\Filament\Resources\Products\Schemas;

use AbdulmajeedJamaan\FilamentTranslatableTabs\TranslatableTabs;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Fieldset;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make([
                    'default' => 1,
                ])->schema([
                    TextInput::make('name')
                        ->label('Nome')
                        ->required()
                        ->columnSpanFull()
                        ->translatableTabs(),

                    TextInput::make('slug')
                        ->label('Slug')
                        ->required()
                        ->columnSpanFull()
                        ->translatableTabs(),

                    Section::make('Banner')
                        ->schema([
                            FileUpload::make('banner')
                                ->belowContent('Tamanho recomendado: 1920×650px.')
                                ->image()
                                ->disk('public')
                                ->required()
                                ->columnSpanFull(),

                            TextInput::make('banner_description')
                                ->label('Descrição do banner')
                                ->translatableTabs(),
                        ]),
                    RichEditor::make('description')
                        ->label('Descrição')
                        ->columnSpanFull()
                        ->required()
                        ->translatableTabs(),

                    FileUpload::make('image')
                        ->label('Imagem')
                        ->belowContent('Tamanho recomendado: 1000×1000px.')
                        ->image()
                        ->disk('public')
                        ->required(),

                    Select::make('segments')
                        ->label('Segmentos')
                        ->multiple()
                        ->relationship('segments', 'name'),

                    Repeater::make('images_product_use')
                        ->label('Imagens de onde esse material é utilizado')
                        ->schema([
                            FileUpload::make('images_product_use')
                                ->label('Imagem')
                                ->belowContent('Tamanho recomendado: 1000×1000px.')
                                ->image()
                                ->disk('public')
                                ->required(),
                        ])
                        ->columnSpanFull(),
                ])
                ->columnSpanFull()
            ]);
    }
}
