<?php

namespace App\Console\Commands;

use App\Models\Product;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class SyncCloudinaryImages extends Command
{
    protected $signature = 'cloudinary:sync';
    protected $description = 'Sincroniza URLs das imagens do Cloudinary com o banco de dados';

    private string $cloudName = 'dtdzvmniu';
    private string $apiKey = '928973282772645';
    private string $apiSecret = 'L4CvqTYy5xVkx9hHiCyDumLLlG0';

    public function handle()
    {
        $this->info('Buscando imagens no Cloudinary...');

        // Buscar todas as imagens da pasta products
        $resources = $this->fetchCloudinaryResources();

        if (empty($resources)) {
            $this->error('Nenhuma imagem encontrada no Cloudinary!');
            return;
        }

        $this->info('Encontradas ' . count($resources) . ' imagens no Cloudinary.');

        // Criar mapa: nome_original => url_cloudinary
        $imageMap = [];
        foreach ($resources as $resource) {
            // public_id ex: products/01K3VD5XXYD2A02HKE2TB73NMS_ck7xtw
            $publicId = $resource['public_id'];
            $format = $resource['format'];
            $url = $resource['secure_url'];

            // Extrair nome sem pasta e sem sufixo
            $filename = basename($publicId); // 01K3VD5XXYD2A02HKE2TB73NMS_ck7xtw
            
            // Remover sufixo _xxxxxx (últimos 7 chars após o último _)
            $nameWithoutSuffix = preg_replace('/_[a-z0-9]{6,7}$/', '', $filename);

            $imageMap[$nameWithoutSuffix] = $url;
            $imageMap[$filename] = $url; // também mapeia com sufixo
            
            // Mapear com extensão
            $imageMap[$nameWithoutSuffix . '.' . $format] = $url;
            $imageMap[$filename . '.' . $format] = $url;
        }

        $this->info('Atualizando produtos...');
        $updated = 0;
        $notFound = 0;

        $products = Product::all();

        foreach ($products as $product) {
            $changed = false;

            // Atualizar image
            if ($product->image) {
                $key = basename($product->image);
                $keyNoExt = pathinfo($key, PATHINFO_FILENAME);
                
                $newUrl = $imageMap[$key] ?? $imageMap[$keyNoExt] ?? null;
                
                if ($newUrl) {
                    $product->image = $newUrl;
                    $changed = true;
                } else {
                    $this->warn("Imagem não encontrada: {$product->image}");
                    $notFound++;
                }
            }

            // Atualizar banner
            if ($product->banner) {
                $key = basename($product->banner);
                $keyNoExt = pathinfo($key, PATHINFO_FILENAME);
                
                $newUrl = $imageMap[$key] ?? $imageMap[$keyNoExt] ?? null;
                
                if ($newUrl) {
                    $product->banner = $newUrl;
                    $changed = true;
                }
            }

            // Atualizar images_product_use
            if ($product->images_product_use) {
                $newImages = [];
                foreach ($product->images_product_use as $img) {
                    $key = basename($img['images_product_use']);
                    $keyNoExt = pathinfo($key, PATHINFO_FILENAME);
                    
                    $newUrl = $imageMap[$key] ?? $imageMap[$keyNoExt] ?? $img['images_product_use'];
                    $newImages[] = ['images_product_use' => $newUrl];
                }
                $product->images_product_use = $newImages;
                $changed = true;
            }

            if ($changed) {
                $product->saveQuietly();
                $updated++;
                $this->line("✓ Produto {$product->id} atualizado");
            }
        }

        $this->info("");
        $this->info("✅ Concluído! {$updated} produtos atualizados.");
        if ($notFound > 0) {
            $this->warn("⚠️  {$notFound} imagens não encontradas no Cloudinary.");
        }
    }

    private function fetchCloudinaryResources(): array
    {
        $url = "https://api.cloudinary.com/v1_1/{$this->cloudName}/resources/image";
        
        $response = Http::withBasicAuth($this->apiKey, $this->apiSecret)
            ->get($url, [
                'type' => 'upload',
                'prefix' => 'products/',
                'max_results' => 500,
            ]);

        if (!$response->successful()) {
            $this->error('Erro ao buscar imagens: ' . $response->body());
            return [];
        }

        return $response->json('resources', []);
    }
}
