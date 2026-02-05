<?php

namespace App\Filament\Widgets;

use App\Models\Comment;
use App\Models\Post;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use LaraZeus\Sky\Models\Tag;

class StatsOverview extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Postagens', Post::count())
                ->icon('heroicon-o-document-text')
                ->description('Total de postagens'),

            Stat::make('Comentários', Comment::count())
                ->icon('heroicon-o-chat-bubble-left-right')
                ->description('Total de comentários'),

            Stat::make('Tags e Categorias', Tag::count())
                ->icon('heroicon-o-document-text')
                ->description('Total de tags e Categorias'),
        ];
    }
}
