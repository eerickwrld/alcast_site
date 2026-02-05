<?php

namespace App\Filament\Resources\Menus;

use App\Filament\Resources\Menus\Pages\CreateMenu;
use App\Filament\Resources\Menus\Pages\EditMenu;
use App\Filament\Resources\Menus\Pages\ListMenus;
use App\Filament\Resources\Menus\Pages\ViewMenu;
use App\Filament\Resources\Menus\Schemas\MenuForm;
use App\Filament\Resources\Menus\Schemas\MenuInfolist;
use App\Filament\Resources\Menus\Tables\MenusTable;
use App\Models\Menu;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Model;
use Tapp\FilamentAuditing\RelationManagers\AuditsRelationManager;

class MenuResource extends Resource
{
    protected static ?string $model = Menu::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::Bars4;

    protected static string|null|\UnitEnum $navigationGroup = 'Configurações';
    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return MenuForm::configure($schema);
    }

    protected function processMenuItems(array $items): array
    {
        return collect($items)->map(function ($item) {
            return [
                'text' => $item['text'] ?? null,
                'url' => $item['url'] ?? null,
                'icon' => $item['icon'] ?? null,
                'open_in_new_tab' => $item['open_in_new_tab'] ?? false,
            ];
        })->filter(fn($item) => !empty($item['text']) && !empty($item['url']))->values()->toArray();
    }

    protected function processMenuSections(array $sections): array
    {
        return collect($sections)->map(function ($section) {
            $processedSection = [
                'section_title' => $section['section_title'] ?? 'Sem título',
                'section_type' => $section['section_type'] ?? 'links',
            ];

            if ($processedSection['section_type'] === 'links') {
                $processedSection['section_links'] = $this->processMenuItems($section['section_links'] ?? []);
            } else {
                $processedSection['section_content'] = $section['section_content'] ?? '';
            }

            return $processedSection;
        })->filter(fn($section) =>
            ($section['section_type'] === 'links' && !empty($section['section_links'])) ||
            ($section['section_type'] === 'text' && !empty($section['section_content']))
        )->values()->toArray();
    }

    protected function handleRecordCreation(array $data): Model
    {
        $items = $this->processMenuItems($data['items'] ?? []);
        $sections = $this->processMenuSections($data['sections'] ?? []);

        return static::getModel()::create([
            'title' => $data['title'],
            'slug' => $data['slug'],
            'items' => $items,
            'sections' => $sections
        ]);
    }

    protected function handleRecordUpdate(Model $record, array $data): Model
    {
        $items = $this->processMenuItems($data['items'] ?? []);
        $sections = $this->processMenuSections($data['sections'] ?? []);

        $record->update([
            'title' => $data['title'],
            'slug' => $data['slug'],
            'items' => $items,
            'sections' => $sections
        ]);

        return $record;
    }

    public static function infolist(Schema $schema): Schema
    {
        return MenuInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return MenusTable::configure($table);
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
            'index' => ListMenus::route('/'),
            'create' => CreateMenu::route('/create'),
            'view' => ViewMenu::route('/{record}'),
            'edit' => EditMenu::route('/{record}/edit'),
        ];
    }
}
