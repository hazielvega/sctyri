<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facultad extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre'
    ];

    public function carreras()
    {
        return $this->hasMany(Carrera::class);
    }

    public function entidades()
    {
        return $this->belongsToMany(Entidad::class, 'facultad_entidades');
    }
}