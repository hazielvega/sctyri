<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expediente extends Model
{
    use HasFactory;

    protected $fillable = [
        'nro', 'anio', 'dependencia'
    ];

    public function resoluciones()
    {
        return $this->hasMany(Resolucion::class);
    }

    public function documentos()
    {
        return $this->hasMany(Documento::class);
    }
}