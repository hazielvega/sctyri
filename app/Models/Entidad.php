<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entidad extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre', 'entidad_tipo_id', 'cuit'
    ];

    public function tipo()
    {
        return $this->belongsTo(EntidadTipo::class, 'entidad_tipo_id');
    }

    public function convenios()
    {
        return $this->belongsToMany(Convenio::class, 'convenio_entidades');
    }

    public function facultades()
    {
        return $this->belongsToMany(Facultad::class, 'facultad_entidades');
    }

    public function serviciosRepetitivos()
    {
        return $this->belongsToMany(ServicioRepetitivo::class, 'servicios_repetitivos_entidad');
    }
}