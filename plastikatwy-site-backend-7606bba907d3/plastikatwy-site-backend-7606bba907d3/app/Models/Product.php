<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Spatie\Translatable\HasTranslations;
use OwenIt\Auditing\Contracts\Auditable;

class Product extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    use HasTranslations;

    protected $fillable = [
        'banner',
        'banner_description',
        'name',
        'description',
        'image',
        'images_product_use',
        'slug',
    ];

    protected $casts = [
        'images_product_use' => 'array',
    ];

    protected array $translatable = [
        'name',
        'slug',
        'description',
        'banner_description',
    ];

    protected static function booted()
    {
        //
    }

   public function getUrlImage(): string
{
    return $this->image ?? '';
}

public function getUrlBanner(): string
{
    return $this->banner ?? '';
}

public function getImagesForUse(): array
{
    $images = [];
    foreach (($this->images_product_use ?? []) as $image) {
        $images[] = $image['images_product_use'] ?? '';
    }
    return $images;
}

    private function getCloudinaryUrl($filename): string
    {
        if (empty($filename)) {
            return '';
        }

        $cloudName = env('CLOUDINARY_CLOUD_NAME', 'dtdzvmniu');
        
        // Extrair apenas o nome do arquivo (sem path)
        $basename = basename($filename);
        
        // Remover extensão
        $pathInfo = pathinfo($basename);
        $publicId = $pathInfo['filename'];
        $extension = $pathInfo['extension'] ?? 'jpg';
        
        // Retornar URL do Cloudinary
        return "https://res.cloudinary.com/{$cloudName}/image/upload/{$publicId}.{$extension}";
    }

    public function segments(): BelongsToMany
    {
        return $this->belongsToMany(Segment::class);
    }
}
