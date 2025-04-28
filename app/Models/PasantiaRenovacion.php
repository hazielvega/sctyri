<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PasantiaRenovacion extends Model
{
    use HasFactory;

    protected $table = 'pasantia_renovaciones';

    protected $fillable = [
        'fecha_inicio', 'duracion', 'estado', 'beca_formacion_id'
    ];

    public function beca()
    {
        return $this->belongsTo(Beca::class, 'beca_formacion_id');
    }

    public function bajas()
    {
        return $this->hasMany(Baja::class, 'renovacion_id');
    }
}