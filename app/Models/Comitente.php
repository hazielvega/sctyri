<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comitente extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre', 'domicilio', 'cuit', 'servicio_repetivo_id'
    ];

    public function servicioRepetitivo()
    {
        return $this->belongsTo(ServicioRepetitivo::class, 'servicio_repetivo_id');
    }
}