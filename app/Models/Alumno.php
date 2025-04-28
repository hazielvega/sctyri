<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alumno extends Model
{
    use HasFactory;

    protected $fillable = [
        'dni', 'nombre', 'apellido'
    ];

    public function carreras()
    {
        return $this->belongsToMany(Carrera::class, 'alumno_carreras')
                    ->withPivot('lu_alumno')
                    ->withTimestamps();
    }

    public function becas()
    {
        return $this->hasManyThrough(Beca::class, AlumnoCarrera::class, 'alumno_id', 'alumno_carrera_id');
    }

    public function pasantias()
    {
        return $this->hasManyThrough(Pasantia::class, AlumnoCarrera::class, 'alumno_id', 'alumno_carreras_id');
    }
}