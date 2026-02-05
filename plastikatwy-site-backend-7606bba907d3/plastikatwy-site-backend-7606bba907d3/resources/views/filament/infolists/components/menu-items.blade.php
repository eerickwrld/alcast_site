@if (filled($state))
    <div class="space-y-2">
        @foreach($state as $item)
            @dd($item)
            <div class="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        @if(isset($item['icon']) && filled($item['icon']))
                            <x-dynamic-component :component="$item['icon']" class="h-4 w-4 text-gray-500" />
                        @endif
                        <span class="font-medium">{{ $item['text'] ?? 'Sem texto' }}</span>
                    </div>
                    <div class="text-sm text-gray-500">
                        {{ $item['url'] ?? '#' }}
                        @if(isset($item['open_in_new_tab']) && $item['open_in_new_tab'])
                            <span class="ml-1 text-xs">(abrir em nova aba)</span>
                        @endif
                    </div>
                </div>
            </div>
        @endforeach
    </div>
@else
    <p class="text-sm text-gray-500">Nenhum link adicionado.</p>
@endif
