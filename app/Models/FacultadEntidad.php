<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FacultadEntidad extends Model
{
    use HasFactory;

    protected $table = 'facultad_entidades';

    protected $fillable = [
        'entidad_id', 'facultad_id'
    ];

    public function facultad()
    {
        return $this->belongsTo(Facultad::class);
    }

    public function entidad()
    {
        return $this->belongsTo(Entidad::class);
    }
}