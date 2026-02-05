<?php

namespace App\Filament\Resources\PageTemplates\Schemas;

use App\Models\PageTemplate;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Fieldset;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class PageTemplateForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Section::make('Informações Básicas')
                    ->schema([
                        TextInput::make('name')
                            ->label('Nome do Template')
                            ->required()
                            ->maxLength(255)
                            ->reactive(),

                        TextInput::make('slug')
                            ->label('Slug')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255),

                        Textarea::make('description')
                            ->label('Descrição')
                            ->rows(3),

                        TextInput::make('view_component')
                            ->label('Componente de Visualização')
                            ->placeholder('components.pages.home')
                            ->helperText('Nome do componente Blade que será usado para renderizar as páginas deste template'),

                        Toggle::make('is_active')
                            ->label('Ativo')
                            ->default(true),
                    ])
                    ->columnSpanFull(),


                Section::make('Estrutura das Seções')
                    ->schema([
                        Repeater::make('custom_fields_schema')
                            ->label('Seções')
                            ->createItemButtonLabel('Adicionar Seção')
                            ->itemLabel(fn (array $state): ?string => $state['section_name'] ?? 'Nova Seção')
                            ->schema([
                                TextInput::make('section_name')
                                    ->label('Nome da Seção')
                                    ->required()
                                    ->reactive(),

                                TextInput::make('section_slug')
                                    ->label('Slug da Seção')
                                    ->disabled()
                                    ->dehydrated(),

                                Repeater::make('fields')
                                    ->label('Campos da Seção')
                                    ->createItemButtonLabel('Adicionar Campo')
                                    ->itemLabel(fn (array $state): ?string => $state['label'] ?? 'Novo Campo')
                                    ->schema([
                                        TextInput::make('name')
                                            ->label('Nome do Campo')
                                            ->required()
                                            ->placeholder('ex: missao_texto')
                                            ->helperText('Usado internamente no código')
                                            ->reactive(),

                                        TextInput::make('label')
                                            ->label('Label do Campo')
                                            ->required()
                                            ->placeholder('ex: Texto da Missão'),

                                        Select::make('type')
                                            ->label('Tipo do Campo')
                                            ->required()
                                            ->options([
                                                'text' => 'Texto',
                                                'textarea' => 'Texto Longo',
                                                'rich_text' => 'Editor Rico',
                                                'image' => 'Imagem',
                                                'repeater' => 'Lista Repetível',
                                                'select' => 'Seleção',
                                                'link' => 'Link',
                                                'toogle' => 'Toggle',
                                            ])
                                            ->reactive(),

                                        Toggle::make('required')
                                            ->label('Campo Obrigatório')
                                            ->default(false),

                                        KeyValue::make('options')
                                            ->label('Opções (apenas para tipo Seleção)')
                                            ->visible(fn (callable $get) => $get('type') === 'select')
                                            ->keyLabel('Valor')
                                            ->valueLabel('Label')
                                            ->helperText('Adicione as opções que estarão disponíveis para seleção'),

                                        TextInput::make('directory')
                                            ->label('Diretório de Upload')
                                            ->placeholder('pages/empresa')
                                            ->visible(fn (callable $get) => $get('type') === 'image')
                                            ->helperText('Diretório onde as imagens serão salvas'),
                                        TextInput::make('help_text')
                                            ->label('Texto de Ajuda'),
                                        Repeater::make('schema')
                                            ->label('Campos do Repeater')
                                            ->visible(fn (callable $get) => $get('type') === 'repeater')
                                            ->schema([
                                                TextInput::make('name')
                                                    ->label('Nome do Campo')
                                                    ->required()
                                                    ->placeholder('ex: nome'),

                                                TextInput::make('label')
                                                    ->label('Label do Campo')
                                                    ->required()
                                                    ->placeholder('ex: Nome Completo'),

                                                Select::make('type')
                                                    ->label('Tipo do Campo')
                                                    ->required()
                                                    ->options([
                                                        'text' => 'Texto',
                                                        'textarea' => 'Texto Longo',
                                                        'image' => 'Imagem',
                                                        'link' => 'Link',
                                                        'toogle' => 'Ativo/Inativo',
                                                    ]),
                                            ])
                                            ->columns(3)
                                            ->itemLabel(fn (array $state): ?string => $state['label'] ?? 'Novo Campo no Repeater'),
                                    ])
                                    ->columns(2)
                                    ->collapsible(),
                            ])
                            ->collapsible()
                            ->collapsed()
                            ->grid(1)
                            ->columnSpanFull(),
                    ])
                    ->columnSpanFull(),

            ]);
    }

}
