<?php

namespace App\Filament\Resources\Configurations;

use App\Filament\Resources\Configurations\Pages\CreateConfiguration;
use App\Filament\Resources\Configurations\Pages\EditConfiguration;
use App\Filament\Resources\Configurations\Pages\ListConfigurations;
use App\Filament\Resources\Configurations\Pages\ViewConfiguration;
use App\Filament\Resources\Configurations\Schemas\ConfigurationForm;
use App\Filament\Resources\Configurations\Schemas\ConfigurationInfolist;
use App\Filament\Resources\Configurations\Tables\ConfigurationsTable;
use App\Models\Configuration;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Tapp\FilamentAuditing\RelationManagers\AuditsRelationManager;

class ConfigurationResource extends Resource
{
    protected static ?string $model = Configuration::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::Cog;

    protected static string|null|\UnitEnum $navigationGroup = 'Configurações';

    protected static bool $shouldRegisterNavigation = false;

    protected static ?string $modelLabel = 'Configurações';

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return ConfigurationForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return ConfigurationInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ConfigurationsTable::configure($table);
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
            'index' => ListConfigurations::route('/'),
            'create' => CreateConfiguration::route('/create'),
            'view' => ViewConfiguration::route('/{record}'),
            'edit' => EditConfiguration::route('/{record}/edit'),
        ];
    }
}
