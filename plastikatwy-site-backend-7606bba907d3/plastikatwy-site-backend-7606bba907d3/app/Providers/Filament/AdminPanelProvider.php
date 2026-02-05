<?php

namespace App\Providers\Filament;

use App\Filament\Resources\Configurations\ConfigurationResource;
use Filament\Actions\Action;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Navigation\NavigationGroup;
use Filament\Navigation\NavigationItem;
use Filament\Pages\Dashboard;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Widgets\AccountWidget;
use Filament\Widgets\FilamentInfoWidget;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use LaraZeus\Sky\Filament\Resources\FaqResource;
use LaraZeus\Sky\Filament\Resources\LibraryResource;
use LaraZeus\Sky\Filament\Resources\NavigationResource;
use LaraZeus\Sky\Filament\Resources\PageResource;
use LaraZeus\Sky\SkyPlugin;
use LaraZeus\SpatieTranslatable\SpatieTranslatablePlugin;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->passwordReset()
            ->colors([
                'primary' => "rgb(26,64,138)",
                'secondary' => "rgb(228,233,243)"
            ])
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\Filament\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\Filament\Pages')
            ->pages([
                Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\Filament\Widgets')
            ->widgets([
                AccountWidget::class,
//                FilamentInfoWidget::class,
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ])
            ->plugins([
                SpatieTranslatablePlugin::make()->defaultLocales([
                    'pt_BR',
                    'en',
                    'es'
                ]),
                SkyPlugin::make()
                    ->postResource()
                    ->libraryResource(false)
                    ->faqResource(false)
                    ->pageResource(false)
                    ->hideResources([
                        FaqResource::class,
                        PageResource::class,
                        LibraryResource::class,
                        NavigationResource::class,
                    ])
                    ->navigationGroupLabel('Blog')
            ])
            ->databaseNotifications()
            ->navigationItems([
                NavigationItem::make('Geral')
                    ->url(fn() => ConfigurationResource::getUrl('view', ['record' => 1]))
                    ->icon('heroicon-o-cog')
                    ->group('Configurações')
                    ->isActiveWhen(fn(): bool => request()->path() === "admin/configurations/1")
                    ->visible(fn() => auth()->user()->hasRole('Admin'))
            ])
            ->navigationGroups([
                'Blog' => NavigationGroup::make(fn() => __('nav.blog')),
                'Settings' => NavigationGroup::make(fn() => __('nav.settings')),
                'Developer' => NavigationGroup::make(fn() => __('nav.developer')),
            ])
            ->brandLogo(fn() => asset('/images/logo.svg'));
    }
}
