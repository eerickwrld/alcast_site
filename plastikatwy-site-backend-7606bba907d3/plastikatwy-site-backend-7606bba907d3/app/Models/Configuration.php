<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
use Spatie\Translatable\HasTranslations;

class Configuration extends Model implements Auditable
{
    use HasTranslations;
    use \OwenIt\Auditing\Auditable;

    protected $fillable = [
        'sectors',
        'address',
        'map',
        'social_networks',
        'contact_info',
        'footer_info'
    ];

    protected $casts = [
        'sectors' => 'array',
        'address' => 'array',
        'social_networks' => 'array',
        'contact_info' => 'array',
        'footer_info' => 'array',
    ];

    protected array $translatable = [
        "footer_info"
    ];
}
