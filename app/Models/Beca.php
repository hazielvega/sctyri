<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Beca extends Model
{
    use HasFactory;

    protected $fillable = [
        'alumno_carrera_id', 'resolucion_id', 'fecha_inicio',
        'duracion', 'estado', 'dependencia', 'sector'
    ];

    public function alumnoCarrera()
    {
        return $this->belongsTo(AlumnoCarrera::class, 'alumno_carrera_id');
    }

    public function resolucion()
    {
        return $this->belongsTo(Resolucion::class);
    }

    public function renovaciones()
    {
        return $this->hasMany(BecaRenovacion::class, 'beca_formacion_id');
    }
}