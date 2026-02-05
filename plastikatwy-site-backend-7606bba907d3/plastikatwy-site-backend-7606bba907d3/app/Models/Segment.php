<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Spatie\Translatable\HasTranslations;
use OwenIt\Auditing\Contracts\Auditable;

class Segment extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    use HasTranslations;

    protected $fillable = [
        'name',
        'description',
        'slug',
        'image',
        'active',
        'images',
    ];

    protected array $translatable = [
        'name',
        'description',
    ];

    protected $casts = [
        'active' => 'boolean',
        'images' => 'array',
    ];

    protected $appends = [
        'image_api',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function ($model) {
            $model->slug = Str::slug($model->name);
        });

        static::updating(function ($model) {
            $model->slug = Str::slug($model->name);
        });

    }

    public function getUrlImage(): string
    {
        return Storage::disk('public')->url($this->image);
    }

    public function getImageApiAttribute(): array
    {
        $images = [];
        foreach ($this->images as $value) {
            $images[] = Storage::disk('public')->url($value['images']);
        }

        return $images;
    }

}
