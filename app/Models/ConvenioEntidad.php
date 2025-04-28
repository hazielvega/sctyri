<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConvenioEntidad extends Model
{
    use HasFactory;

    protected $table = 'convenio_entidades';

    protected $fillable = [
        'convenio_id', 'entidad_id'
    ];

    public function convenio()
    {
        return $this->belongsTo(Convenio::class);
    }

    public function entidad()
    {
        return $this->belongsTo(Entidad::class);
    }
}