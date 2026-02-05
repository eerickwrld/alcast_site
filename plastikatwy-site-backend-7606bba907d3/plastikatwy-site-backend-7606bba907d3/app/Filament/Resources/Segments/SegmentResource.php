<?php

namespace App\Filament\Resources\Segments;

use App\Filament\Resources\Segments\Pages\CreateSegment;
use App\Filament\Resources\Segments\Pages\EditSegment;
use App\Filament\Resources\Segments\Pages\ListSegments;
use App\Filament\Resources\Segments\Pages\ViewSegment;
use App\Filament\Resources\Segments\Schemas\SegmentForm;
use App\Filament\Resources\Segments\Schemas\SegmentInfolist;
use App\Filament\Resources\Segments\Tables\SegmentsTable;
use App\Models\Segment;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Tapp\FilamentAuditing\RelationManagers\AuditsRelationManager;

class SegmentResource extends Resource
{
    protected static ?string $model = Segment::class;

//    protected static string|null|\UnitEnum $navigationGroup = 'Produtos e Segmentos';
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $modelLabel = 'Segmentos';

    protected static ?string $recordTitleAttribute = 'name';

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::query()->count();
    }

    public static function form(Schema $schema): Schema
    {
        return SegmentForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return SegmentInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return SegmentsTable::configure($table);
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
            'index' => ListSegments::route('/'),
            'create' => CreateSegment::route('/create'),
            'view' => ViewSegment::route('/{record}'),
            'edit' => EditSegment::route('/{record}/edit'),
        ];
    }
}
