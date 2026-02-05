<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Nome')
                    ->required(),
                TextInput::make('email')
                    ->label('Email')
                    ->email()
                    ->required(),
                Select::make('role')
                    ->label('Função')
                    ->options([
                        'Admin' => 'Admin',
                        'Editor' => 'Editor',
                        'Desenvolvedor' => 'Desenvolvedor'
                    ])
                    ->required(),
                TextInput::make('password')
                    ->label('Senha')
                    ->password()
                    ->disabledOn('edit'),
                TextInput::make('password_confirmation')
                    ->label('Confirmação de Senha')
                    ->password()
                    ->disabledOn('edit')
                    ->same('password'),
                Textarea::make('description')
                    ->label('Descrição')
                    ->columnSpanFull(),
                FileUpload::make('avatar')
                    ->image()
                    ->disk('public')
                    ->required(),

            ]);
    }
}
