<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Convenio extends Model
{
    use HasFactory;

    protected $fillable = [
        'fecha_firma', 'tipo_convenio_id', 'resolucion_id', 
        'duracion', 'renovable', 'fecha_fin'
    ];

    public function tipo()
    {
        return $this->belongsTo(ConvenioTipo::class, 'tipo_convenio_id');
    }

    public function resolucion()
    {
        return $this->belongsTo(Resolucion::class);
    }

    public function entidades()
    {
        return $this->belongsToMany(Entidad::class, 'convenio_entidades');
    }

    public function pasantias()
    {
        return $this->hasMany(Pasantia::class);
    }
}