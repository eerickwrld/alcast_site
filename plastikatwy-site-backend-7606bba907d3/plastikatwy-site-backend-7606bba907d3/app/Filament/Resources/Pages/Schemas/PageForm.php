<?php

namespace App\Filament\Resources\Pages\Schemas;

use App\Models\Page;
use App\Models\PageTemplate;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Section as FormSection;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;

class PageForm
{
    public static function configure(Schema $schema): Schema
    {
        $currentOperation = $schema->getOperation();

        return $schema
            ->components([
                Grid::make(2)->schema([
                    // Seção de Informações Básicas
                    Section::make('Informações Básicas')
                        ->schema([
                            TextInput::make('title')
                                ->label('Título')
                                ->required()
                                ->maxLength(255),
                            Select::make('language')
                                ->label('Idioma')
                                ->options(config('languages'))
                                ->required()
                                ->allowHtml(),
                            TextInput::make('slug')
                                ->label('Slug')
                                ->required()
                                ->maxLength(255),
//                            Textarea::make('description')
//                                ->label('Descrição')
//                                ->rows(3),

                            Select::make('page_template_id')
                                ->label('Template')
//                                ->readOnly()
                                ->required()
                                ->options(PageTemplate::where('is_active', true)->pluck('name', 'id'))
                                ->reactive()
                                ->afterStateUpdated(function ($state, callable $set) {
                                    // Limpa os custom fields quando trocar de template
                                    $set('custom_fields_data', []);
                                }),
                        ]),

                    // Seção de SEO
                    Section::make('SEO')
                        ->schema([
                            TextInput::make('meta_title')
                                ->label('Meta Título')
                                ->maxLength(60),

                            Textarea::make('meta_description')
                                ->label('Meta Descrição')
                                ->maxLength(160)
                                ->rows(2),
                        ]),

                    // Seção de Campos Personalizados
                    // Esta seção será preenchida dinamicamente com base no template selecionado
                    Section::make('Conteúdo')
                        ->schema(function (Get $get) use($currentOperation) {
                            $templateId = $get('page_template_id');

                            if (!$templateId) {
                                return [
                                    Placeholder::make('template_required')
                                        ->label('')
                                        ->content('Selecione um template para ver os campos personalizados.')
                                ];
                            }

                            $template = PageTemplate::find($templateId);

                            if (!$template) {
                                return [];
                            }

                            // Carrega os dados existentes para o formulário
                            $record = $get('record');
                            $existingData = $record ? $record->custom_fields_data : [];

                            // Prepara os dados para o formulário
                            if (!empty($existingData)) {
                                $preparedData = $template->prepareCustomFieldsData($existingData);
                                Log::info('text', [$preparedData]);
                                $get->setState($preparedData);
                            }

                            // Obtém as seções de campos personalizados do template
                            return $template->getCustomFieldsForFilament($currentOperation);
                        })
                        ->visible(fn (Get $get) => $get('page_template_id'))
                        ->columnSpanFull(),
                ])->columnSpanFull()
            ]);
    }
}
