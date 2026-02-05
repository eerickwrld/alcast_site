<?php

namespace App\Filament\Resources\Audits\Schemas;

use Filament\Infolists\Components\CodeEntry;
use Filament\Infolists\Components\KeyValueEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class AuditInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('user.name')
                    ->label('Nome'),
                TextEntry::make('auditable_type')
                    ->label('Tipo do Item'),
                TextEntry::make('auditable_id')
                    ->label('ID do Item'),
                TextEntry::make('created_at')
                    ->label('Criado em')
                    ->dateTime('d/m/Y H:i:s'),
                TextEntry::make('ip_address')
                    ->label('IP'),
                TextEntry::make('user_agent')
                    ->label('User Agent'),
                KeyValueEntry::make('old_values')
                    ->label('Antes')
                    ->columnSpanFull(),
                KeyValueEntry::make('new_values')
                    ->label('Depois')
                    ->columnSpanFull(),

            ]);
    }
}
