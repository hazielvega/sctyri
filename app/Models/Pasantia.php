<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pasantia extends Model
{
    use HasFactory;

    protected $fillable = [
        'fecha_acta', 'fecha_inicio', 'duracion', 'fecha_fin',
        'estado', 'monto', 'domicilio', 'tareas', 'alumno_carreras_id',
        'docente_id', 'convenio_id'
    ];

    public function scopeFechaInicioBeforeFechaFin($query)
    {
        return $query->where('fecha_inicio', '<', 'fecha_fin');
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('fecha_acta', 'like', '%'.$search.'%')
                    ->orWhere('fecha_inicio', 'like', '%'.$search.'%')
                    ->orWhere('fecha_fin', 'like', '%'.$search.'%')
                    ->orWhere('estado', 'like', '%'.$search.'%')
                    ->orWhere('monto', 'like', '%'.$search.'%')
                    ->orWhere('domicilio', 'like', '%'.$search.'%')
                    ->orWhere('tareas', 'like', '%'.$search.'%');
            });
        })->when($filters['estado'] ?? null, function ($query, $estado) {
            $query->where('estado', $estado);
        });
    }

    public function alumnoCarrera()
    {
        return $this->belongsTo(AlumnoCarrera::class, 'alumno_carreras_id');
    }

    public function docente()
    {
        return $this->belongsTo(Docente::class);
    }

    public function convenio()
    {
        return $this->belongsTo(Convenio::class);
    }

    public function controles()
    {
        return $this->hasMany(PasantiaControl::class);
    }

    public function pagos()
    {
        return $this->hasMany(PasantiaPago::class, 'pasantias_id_pasantia');
    }

    public function renovaciones()
    {
        return $this->hasMany(PasantiaRenovacion::class);
    }

    public function bajas()
    {
        return $this->hasMany(Baja::class);
    }
}