<?php

namespace App\Filament\Resources\Menus\Schemas;

use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Section as FormSection;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class MenuForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->schema(
                self::schema()
            );
    }

    public static function schema(): array
    {
        return [
            TextInput::make('title')
                ->label('Título do Menu')
                ->required()
                ->maxLength(255)
                ->live(debounce: 500)
                ->afterStateUpdated(function (Get $get, Set $set, ?string $state) {
                    if (!$get('is_slug_changed_manually') && filled($state)) {
                        $set('slug', Str::slug($state));
                    }
                }),

            TextInput::make('slug')
                ->label('Slug')
                ->required()
                ->maxLength(255)
                ->unique(ignoreRecord: true)
                ->afterStateUpdated(fn (Set $set) => $set('is_slug_changed_manually', true))
                ->hidden(fn (string $context) => $context === 'edit'),

            Select::make('language')
                ->label('Idioma')
                ->options(config('languages'))
                ->required()
                ->allowHtml(),

            FormSection::make('Links do Menu')
                ->description('Adicione os links principais do menu')
                ->schema([
                    Repeater::make('items')
                        ->label('')
                        ->schema(self::linkItemSchema())
                        ->itemLabel(fn (array $state) => $state['text']['pt-BR'] ?? 'Novo Link')
                        ->collapsible()
                        ->cloneable()
                        ->defaultItems(0)
                        ->reorderableWithButtons()
                        ->columns(2)
                ])
                ->collapsible()
                ->columnSpanFull(),

//            FormSection::make('Seções do Menu')
//                ->description('Crie seções com listas de links ou conteúdo de texto')
//                ->schema([
//                    Repeater::make('sections')
//                        ->label('')
//                        ->schema([
//                            TextInput::make('section_title')
//                                ->label('Título da Seção')
//                                ->required()
//                                ->maxLength(255),
//
//                            Select::make('section_type')
//                                ->label('Tipo de Conteúdo')
//                                ->options([
//                                    'links' => 'Lista de Links',
//                                    'text' => 'Texto',
//                                ])
//                                ->default('links')
//                                ->live()
//                                ->required(),
//
//                            // Seção para links
//                            Repeater::make('section_links')
//                                ->label('Links da Seção')
//                                ->schema(self::linkItemSchema())
//                                ->itemLabel(fn (array $state): ?string => $state['text'] ?? 'Novo Link')
//                                ->hidden(fn (Get $get) => $get('section_type') !== 'links')
//                                ->collapsible()
//                                ->cloneable()
//                                ->defaultItems(0)
//                                ->reorderableWithButtons()
//                                ->columns(2),
//
//                            // Seção para texto
//                            Textarea::make('section_content')
//                                ->label('Conteúdo da Seção')
//                                ->hidden(fn (Get $get) => $get('section_type') !== 'text')
//                                ->columnSpanFull(),
//                        ])
//                        ->itemLabel(fn (array $state): ?string => $state['section_title'] ?? 'Nova Seção')
//                        ->collapsible()
//                        ->cloneable()
//                        ->defaultItems(0)
//                        ->reorderableWithButtons()
//                        ->columns(1)
//                ])
//                ->collapsible()
//                ->columnSpanFull(),
        ];
    }

    private static function linkItemSchema(): array
    {
        return [
            TextInput::make('text')
                ->label('Texto do Link')
                ->required()
                ->maxLength(255),

            TextInput::make('url')
                ->label('URL')
                ->required()
                ->url()
                ->maxLength(255),

            Toggle::make('is_external')
                ->label('Link Externo')
                ->required(),
        ];
    }
}
