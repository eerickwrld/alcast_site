<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Spatie\Translatable\HasTranslations;
use OwenIt\Auditing\Contracts\Auditable;

class Menu extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;

    protected $fillable = [
        'title',
        'slug',
        'items',
    ];

    protected $casts = [
        'items' => 'array',
    ];

    protected static function booted()
    {
        static::creating(function ($menu) {
            if (empty($menu->slug)) {
                $menu->slug = Str::slug($menu->title);
            }
        });

        static::updating(function ($menu) {
            if ($menu->isDirty('title') && !$menu->isDirty('slug')) {
                $menu->slug = Str::slug($menu->title);
            }
        });
    }


    public static function rules()
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:menus,slug'],
            'items' => ['nullable', 'array'],
            'items.*.text' => ['required_with:items', 'string', 'max:255'],
            'items.*.url' => ['required_with:items', 'url', 'max:255'],
            'items.*.icon' => ['nullable', 'string', 'max:50'],
            'items.*.open_in_new_tab' => ['boolean'],
        ];
    }
}
