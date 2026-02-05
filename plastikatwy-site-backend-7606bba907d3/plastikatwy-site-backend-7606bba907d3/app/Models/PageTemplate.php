<?php

namespace App\Models;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section as FormSection;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Fieldset;
use Filament\Schemas\Components\Group;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Str;
use OwenIt\Auditing\Contracts\Auditable;

class PageTemplate extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'custom_fields_schema',
        'view_component',
        'is_active'
    ];

    protected $casts = [
        'custom_fields_schema' => 'array',
        'is_active' => 'boolean'
    ];

    public function pages(): HasMany
    {
        return $this->hasMany(Page::class);
    }

    /**
     * Retorna os campos organizados por seção para o formulário do Filament
     */
    public function getCustomFieldsForFilament($operation = null): array
    {
        $sections = [];

        foreach ($this->custom_fields_schema as $section) {
            $sectionName = $section['section_name'] ?? 'Seção sem nome';
            $sectionSlug = $section['section_slug'] ?? Str::slug($sectionName);
            $fields = [];

            // Processa cada campo dentro da seção
            foreach ($section['fields'] as $field) {
                $fieldName = $field['name'] ?? null;

                if (!$fieldName) continue;

                // Adiciona o prefixo da seção ao nome do campo
                $prefixedFieldName = "{$sectionSlug}.{$fieldName}";
                $fields[] = $this->buildFilamentField($field, $prefixedFieldName, $operation);
            }

            // Cria a seção com os campos
            $sections[] = \Filament\Schemas\Components\Section::make($sectionName)
                ->description($section['description'] ?? null)
                ->schema($fields)
                ->collapsible()
                ->collapsed(false)
                ->columns(1)
                ->columnSpanFull();
        }

        return $sections;
    }

    /**
     * Processa os dados dos campos personalizados para salvar no formato estruturado por seção
     */
    public function processCustomFieldsData(array $data): array
    {
        $processedData = [];

        foreach ($this->custom_fields_schema as $section) {
            $sectionSlug = $section['section_slug'] ?? Str::slug($section['section_name'] ?? '');

            if (!isset($data[$sectionSlug])) continue;

            foreach ($section['fields'] as $field) {
                $fieldName = $field['name'] ?? null;

                if (!$fieldName) continue;

                // Obtém o valor do campo do array de dados
                $value = $data[$sectionSlug][$fieldName] ?? null;

                // Armazena no formato: seção.campo => valor
                $processedData["{$sectionSlug}.{$fieldName}"] = $value;
            }
        }

        return $processedData;
    }

    /**
     * Prepara os dados para exibição no formulário
     */
    public function prepareCustomFieldsData(array $data): array
    {
        $preparedData = [];

        foreach ($this->custom_fields_schema as $section) {
            $sectionSlug = $section['section_slug'] ?? Str::slug($section['section_name'] ?? '');
            $preparedData[$sectionSlug] = [];

            foreach ($section['fields'] as $field) {
                $fieldName = $field['name'] ?? null;

                if (!$fieldName) continue;

                // Obtém o valor do campo do array de dados
                $value = $data["{$sectionSlug}.{$fieldName}"] ?? null;
                $preparedData[$sectionSlug][$fieldName] = $value;
            }
        }

        return $preparedData;
    }

    private function buildFilamentField(array $fieldConfig, string $fieldName, string $operation = null)
    {
        $type = $fieldConfig['type'] ?? 'text';
        $label = $fieldConfig['label'] ?? ucfirst($fieldConfig['name'] ?? 'Campo');
        $isRequired = $fieldConfig['required'] ?? false;

        $fieldName = 'custom_fields_data.'.$fieldName;

        $field = match ($type) {
            'text' => TextInput::make($fieldName)
                ->label($label)
                ->required($isRequired),

            'textarea' => Textarea::make($fieldName)
                ->label($label)
                ->rows($fieldConfig['rows'] ?? 10)
                ->required($isRequired),

            'rich_text' => $operation === "edit" ? RichEditor::make($fieldName)
                ->label($label)
                ->required($isRequired)
                ->default('This is the default content for the rich text editor.') : MarkdownEditor::make($fieldName)
                ->label($label)
                ->required($isRequired)
                ->default('This is the default content for the rich text editor.') ,

            'image' => FileUpload::make($fieldName)
                ->label($label)
                ->belowContent("Tamanho recomendado: Banners: 1920x650px - Outras Imagens: 1000x1000px")
                ->disk('public')
                ->image()
                ->directory($fieldConfig['directory'] ?? 'pages')
                ->required($isRequired),

            'select' => Select::make($fieldName)
                ->label($label)
                ->options($fieldConfig['options'] ?? [])
                ->required($isRequired),

            'repeater' => Repeater::make($fieldName)
                ->label($label)
                ->schema($this->buildRepeaterSchema($fieldConfig['schema'] ?? []))
                ->required($isRequired)
                ->columnSpanFull(),

            'link' => Fieldset::make($fieldConfig['label'])
                ->columns(['default' => 1])
                ->schema([
                    TextInput::make($fieldName . '_text')
                        ->label('Texto do Link')
                        ->required($isRequired)
                        ->columnSpan(1),
                    TextInput::make($fieldName . '_url')
                        ->label('URL do Link')
                        ->url()
                        ->required($isRequired)
                        ->columnSpan(1),
                ])
                ->columns(2)
                ->columnSpanFull(),

            'toogle' => Toggle::make($fieldName)
                ->label($label)
                ->required($isRequired),

            default => TextInput::make($fieldName)
                ->label($label)
                ->required($isRequired),
        };

        // Adiciona helper text se existir
        if (isset($fieldConfig['help_text'])) {
            $field->helperText($fieldConfig['help_text']);
        }

        return $field;
    }

    private function buildRepeaterSchema(array $schema): array
    {
        $fields = [];

        foreach ($schema as $field) {
            $fieldName = $field['name'] ?? null;

            if (!$fieldName) continue;

            $fields[] = $this->buildFilamentField($field, $fieldName);
        }

        return $fields;
    }
}
