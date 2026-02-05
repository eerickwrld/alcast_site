@if (filled($state))
    <div class="space-y-4">
        @foreach($state as $section)
            <div class="border rounded-lg overflow-hidden">
                <div class="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b">
                    <h3 class="font-medium">{{ $section['section_title'] ?? 'Seção sem título' }}</h3>
                    <p class="text-xs text-gray-500">
                        {{ $section['section_type'] === 'links' ? 'Lista de Links' : 'Conteúdo de Texto' }}
                    </p>
                </div>
                
                <div class="p-4">
                    @if($section['section_type'] === 'links' && !empty($section['section_links']))
                        <div class="space-y-2">
                            @foreach($section['section_links'] as $link)
                                <div class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800/50 rounded">
                                    <div class="flex items-center space-x-2">
                                        @if(isset($link['icon']) && filled($link['icon']))
                                            <x-dynamic-component :component="$link['icon']" class="h-4 w-4 text-gray-500" />
                                        @endif
                                        <span>{{ $link['text'] ?? 'Link sem texto' }}</span>
                                    </div>
                                    <div class="text-sm text-gray-500">
                                        {{ $link['url'] ?? '#' }}
                                        @if(isset($link['open_in_new_tab']) && $link['open_in_new_tab'])
                                            <span class="ml-1 text-xs">(nova aba)</span>
                                        @endif
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    @elseif($section['section_type'] === 'text' && !empty($section['section_content']))
                        <div class="prose prose-sm dark:prose-invert max-w-none">
                            {!! nl2br(e($section['section_content'])) !!}
                        </div>
                    @else
                        <p class="text-sm text-gray-500">Nenhum conteúdo nesta seção.</p>
                    @endif
                </div>
            </div>
        @endforeach
    </div>
@else
    <p class="text-sm text-gray-500">Nenhuma seção adicionada.</p>
@endif
