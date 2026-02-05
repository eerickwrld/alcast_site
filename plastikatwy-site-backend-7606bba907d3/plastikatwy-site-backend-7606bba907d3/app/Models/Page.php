<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;
use OwenIt\Auditing\Contracts\Auditable;

class Page extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'page_template_id',
        'custom_fields_data',
        'meta_title',
        'meta_description',
        'is_published',
        'published_at',
        'language'
    ];

    protected $attributes = [
        'custom_fields_data' => '{}' // Valor padrão como JSON vazio
    ];

    protected $casts = [
        'custom_fields_data' => 'array',
        'is_published' => 'boolean',
        'published_at' => 'datetime'
    ];

    protected static function booted()
    {
        static::creating(function ($page) {
            if (!isset($page->custom_fields_data)) {
                $page->custom_fields_data = [];
            }
        });
    }

//    protected static function boot(){
//        parent::boot();
//
//        static::creating(function ($model) {
//            dd($model);
//        });
//    }

    public function pageTemplate(): BelongsTo
    {
        return $this->belongsTo(PageTemplate::class);
    }

    // Scope para páginas publicadas
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }

    // Retorna um campo customizado específico
    public function getCustomField(string $field, $default = null)
    {
        return data_get($this->custom_fields_data, $field, $default);
    }

    // Define um campo customizado
    public function setCustomField(string $field, $value): void
    {
        $data = $this->custom_fields_data ?? [];
        data_set($data, $field, $value);
        $this->custom_fields_data = $data;
    }
}
