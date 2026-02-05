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
        return Storage::disk('public')->url($this->image);
    }

    public function getUrlBanner(): string
    {
        return Storage::disk('public')->url($this->banner);
    }

    public function getImagesForUse()
    {
        $images = [];

        foreach ($this->images_product_use as $image) {
            $images[] = Storage::disk('public')->url($image['images_product_use']);
        }

        return $images;
    }

    public function segments(): BelongsToMany
    {
        return $this->belongsToMany(Segment::class);
    }
}
