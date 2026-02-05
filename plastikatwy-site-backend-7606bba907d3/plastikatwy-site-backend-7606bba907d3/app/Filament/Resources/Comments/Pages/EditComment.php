<?php

namespace App\Filament\Resources\Comments\Pages;

use App\Filament\Resources\Comments\CommentResource;
use App\Models\Comment;
use Filament\Actions\Action;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditComment extends EditRecord
{
    protected static string $resource = CommentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
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
