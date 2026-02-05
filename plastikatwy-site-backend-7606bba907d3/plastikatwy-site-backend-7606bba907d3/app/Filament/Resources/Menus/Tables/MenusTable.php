<?php

namespace App\Filament\Resources\Menus\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class MenusTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->label('Título')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('slug')
                    ->label('Slug')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('language')
                    ->label('Idioma')
                    ->formatStateUsing(fn (string $state): string => config('languages')[$state])
                    ->html()
                    ->searchable(),


//                TextColumn::make('items_count')
//                    ->label('Itens')
//                    ->getStateUsing(fn ($record) => count($record->items ?? []))
//                    ->badge()
//                    ->color('primary')
//                    ->sortable()
//                    ->toggleable(),

//                TextColumn::make('sections_count')
//                    ->label('Seções')
//                    ->getStateUsing(fn ($record) => count($record->sections ?? []))
//                    ->badge()
//                    ->color('success')
//                    ->sortable()
//                    ->toggleable(),

//                IconColumn::make('has_links')
//                    ->label('Tem Links')
//                    ->boolean()
//                    ->getStateUsing(fn ($record) => !empty($record->items) ||
//                        collect($record->sections ?? [])->contains('section_type', 'links'))
//                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('created_at')
                    ->label('Criado em')
                    ->dateTime('d/m/Y H:i:s')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('updated_at')
                    ->label('Atualizado em')
                    ->dateTime('d/m/Y H:i:s')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                // Filtros podem ser adicionados aqui posteriormente
            ])
            ->recordActions([
                ViewAction::make()
                    ->label('Visualizar'),
                EditAction::make()
                    ->label('Editar'),
            ])
            ->defaultSort('title', 'asc')
            ->searchable()
            ->persistSortInSession()
            ->persistSearchInSession()
            ->persistFiltersInSession()
            ->striped()
            ->deferLoading()
            ->paginated([10, 25, 50, 100]);
    }
}
