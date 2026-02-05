<?php

namespace App\Filament\Resources\PageTemplates;

use App\Filament\Resources\PageTemplates\Pages\CreatePageTemplate;
use App\Filament\Resources\PageTemplates\Pages\EditPageTemplate;
use App\Filament\Resources\PageTemplates\Pages\ListPageTemplates;
use App\Filament\Resources\PageTemplates\Schemas\PageTemplateForm;
use App\Filament\Resources\PageTemplates\Tables\PageTemplatesTable;
use App\Models\PageTemplate;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Tapp\FilamentAuditing\RelationManagers\AuditsRelationManager;

class PageTemplateResource extends Resource
{
    protected static ?string $model = PageTemplate::class;

    protected static string|null|\UnitEnum $navigationGroup = 'Developer';
    protected static ?string $modelLabel = 'Template de Páginas';
    protected static string|BackedEnum|null $navigationIcon = Heroicon::ArchiveBox;

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return PageTemplateForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PageTemplatesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            AuditsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListPageTemplates::route('/'),
            'create' => CreatePageTemplate::route('/create'),
            'edit' => EditPageTemplate::route('/{record}/edit'),
        ];
    }
}
