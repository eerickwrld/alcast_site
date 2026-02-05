<?php

namespace App\Filament\Resources\Comments\Pages;

use App\Filament\Resources\Comments\CommentResource;
use App\Models\Comment;
use Filament\Actions\Action;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewComment extends ViewRecord
{
    protected static string $resource = CommentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
            DeleteAction::make(),
            Action::make('aproveComments')
                ->label('Aprovar comentários')
                ->icon('heroicon-s-check-circle')
                ->color('success')
                ->action(function(array $data, Comment $record, $livewire, $a, $b){
                    $record->is_approved = true;
                    $record->save();
                }),
        ];
    }
}
