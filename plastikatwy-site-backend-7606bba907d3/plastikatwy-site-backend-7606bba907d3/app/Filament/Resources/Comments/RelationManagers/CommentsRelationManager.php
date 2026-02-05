<?php

namespace App\Filament\Resources\Comments\RelationManagers;

use Filament\Actions\CreateAction;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables\Table;
use LaraZeus\Sky\Filament\Resources\PostResource;

class CommentsRelationManager extends RelationManager
{
    protected static string $relationship = 'post';

    protected static ?string $relatedResource = PostResource::class;

    public function table(Table $table): Table
    {
        return $table
            ->headerActions([
                CreateAction::make(),
            ]);
    }
}
