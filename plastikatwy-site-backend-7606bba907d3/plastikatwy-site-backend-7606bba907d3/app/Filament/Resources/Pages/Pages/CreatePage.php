<?php

namespace App\Filament\Resources\Pages\Pages;

use App\Filament\Resources\Pages\PageResource;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\ValidationException;

class CreatePage extends CreateRecord
{
    protected static string $resource = PageResource::class;

    protected function handleRecordCreation(array $data): Model
    {
        $exists = static::getModel()::where('language', $data['language'])->where('slug', $data['slug'])->exists();

        if($exists)
        {
            Notification::make()
                ->danger()
                ->title('Erro ao criar página')
                ->body('Já existe uma página com esse slug e esse idioma.')
                ->send();

            throw ValidationException::withMessages([
                'slug' => 'Já existe uma página com esse slug.',
            ]);
        }

        return static::getModel()::create($data);
    }
}
