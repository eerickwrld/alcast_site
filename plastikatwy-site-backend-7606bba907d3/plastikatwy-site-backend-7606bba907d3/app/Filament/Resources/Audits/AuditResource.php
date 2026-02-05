<?php

namespace App\Filament\Resources\Audits;

use App\Filament\Resources\Audits\Pages\CreateAudit;
use App\Filament\Resources\Audits\Pages\EditAudit;
use App\Filament\Resources\Audits\Pages\ListAudits;
use App\Filament\Resources\Audits\Pages\ViewAudits;
use App\Filament\Resources\Audits\Schemas\AuditForm;
use App\Filament\Resources\Audits\Schemas\AuditInfolist;
use App\Filament\Resources\Audits\Tables\AuditsTable;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use OwenIt\Auditing\Models\Audit;

class AuditResource extends Resource
{
    protected static ?string $model = Audit::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string|null|\UnitEnum $navigationGroup = 'Configurações';

    protected static ?string $modelLabel = 'Logs do Sistema';

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return AuditForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return AuditsTable::configure($table);
    }

    public static function infolist(Schema $schema): Schema
    {
        return AuditInfolist::configure($schema);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListAudits::route('/'),
            'create' => CreateAudit::route('/create'),
//            'edit' => EditAudit::route('/{record}/edit'),
            'view' => ViewAudits::route('/{record}'),
        ];
    }
}
