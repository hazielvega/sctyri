<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AlumnoCarrera extends Model
{
    use HasFactory;

    protected $table = 'alumno_carreras';

    protected $fillable = [
        'alumno_id', 'carrera_id', 'lu_alumno'
    ];

    public function alumno()
    {
        return $this->belongsTo(Alumno::class);
    }

    public function carrera()
    {
        return $this->belongsTo(Carrera::class);
    }

    public function becas()
    {
        return $this->hasMany(Beca::class, 'alumno_carrera_id');
    }

    public function pasantias()
    {
        return $this->hasMany(Pasantia::class, 'alumno_carreras_id');
    }
}