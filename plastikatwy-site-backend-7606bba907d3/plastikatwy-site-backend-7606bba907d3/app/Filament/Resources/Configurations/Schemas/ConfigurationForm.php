<?php

namespace App\Filament\Resources\Configurations\Schemas;

use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Tiptap\Nodes\Text;

class ConfigurationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informações para contato')
                    ->schema([
                        Section::make('Setores')
                        ->schema([
                            Repeater::make('sectors')
                                ->label('Configuração de setores')
                                ->schema([
                                    TextInput::make('sectors.name')
                                        ->label('Nome')
                                        ->required()
                                        ->translatableTabs(),
                                    TextInput::make('sectors.email')->required(),
                                ])
                                ->columns(1),
                        ])
                        ->collapsible()
                        ->columnSpanFull(),

                        Section::make('Telefones')
                            ->schema([
                                TextInput::make('contact_info.phone')
                                    ->label('Telefone')
                                    ->required(),
                                TextInput::make('contact_info.whatsapp')
                                    ->required(),
                            ])
                            ->collapsible()
                            ->columnSpanFull(),

                        Section::make('E-mail - Orçamento')
                            ->description('E-mail para receber contatos de orçamento')
                            ->schema([
                                TextInput::make('contact_info.email')->required(),
                            ])
                            ->collapsible()
                            ->columnSpanFull(),
                    ])
                    ->collapsible()
                    ->columnSpanFull(),

                Section::make('Endereço')
                    ->description('Configuração de endereço')
                    ->schema([
                        TextInput::make('address.country')
                            ->required()
                            ->label('País'),
                        TextInput::make('address.city')
                            ->required()
                            ->label('Cidade'),
                        TextInput::make('address.state')
                            ->required()
                            ->label('Estado'),
                        Textarea::make('address.address')
                            ->required()
                            ->label('Endereço'),
                        TextInput::make('address.map')
                            ->label('Url do Mapa'),
                    ])
                    ->collapsible()
                    ->columnSpanFull(),



                Section::make('Configurações Rodapé')
                    ->schema([
                        Section::make('Seção - Politica de Qualidade')
                            ->schema([
                                TextInput::make('footer_info.policy_quality.title')
                                    ->label('Titulo')
                                    ->translatableTabs(),
                                Textarea::make('footer_info.policy_quality.description')
                                    ->label('Descrição')
                                    ->translatableTabs(),
                            ])
                            ->collapsible()
                            ->columnSpanFull(),

                        Section::make('Seção - Política ambiental')
                            ->schema([
                                TextInput::make('footer_info.policy_environmental.title')
                                    ->label('Titulo')
                                    ->translatableTabs(),
                                Textarea::make('footer_info.policy_environmental.description')
                                    ->label('Descrição')
                                    ->translatableTabs(),
                            ])
                            ->collapsible()
                            ->collapsible(),

                        Section::make('Seção - Política de Privacidade')
                            ->schema([
                                TextInput::make('footer_info.policy_privacy.title')
                                    ->label('Titulo')
                                    ->translatableTabs(),
                                Textarea::make('footer_info.policy_privacy.description')
                                    ->label('Descrição')
                                    ->translatableTabs(),
                                TextInput::make('footer_info.policy_privacy.link')
                                    ->label('Link')
                                    ->url(),
                            ])
                            ->collapsible()

                    ])
                    ->collapsible()
                    ->columnSpanFull(),


                Section::make('Redes Sociais')
                    ->description('Configuração de redes sociais')
                    ->schema([
                        TextInput::make('social_networks.facebook')->required(),
                        TextInput::make('social_networks.instagram')->required(),
                        TextInput::make('social_networks.linkedin')->required(),
                    ])
                    ->collapsible()
                    ->columnSpanFull(),
            ]);
    }
}
