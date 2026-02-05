<?php

namespace App\Filament\Exports;

use App\Models\Newsletter;
use Filament\Actions\Exports\ExportColumn;
use Filament\Actions\Exports\Exporter;
use Filament\Actions\Exports\Models\Export;
use Illuminate\Support\Number;

class NewsletterExporter extends Exporter
{
    protected static ?string $model = Newsletter::class;

    public static function getColumns(): array
    {
        return [
            ExportColumn::make('id')
                ->label('ID'),
            ExportColumn::make('email'),
        ];
    }

    public static function getCompletedNotificationBody(Export $export): string
    {
        $body = 'Sua lista de assinantes da newsletter foi exportada com sucesso!';

        if ($failedRowsCount = $export->getFailedRowsCount()) {
            $body .= ' ' . Number::format($failedRowsCount) . ' ' . str('row')->plural($failedRowsCount) . ' failed to export.';
        }

        return $body;
    }
}
