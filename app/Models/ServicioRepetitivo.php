<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServicioRepetitivo extends Model
{
    use HasFactory;

    protected $table = 'servicios_repetivos';

    protected $fillable = [
        'fecha', 'apellido_responsable_sr', 'nombre_responsable_sr',
        'detalle_tarea_sr', 'forma_de_pago_sr', 'monto_total_sr'
    ];

    public function comitentes()
    {
        return $this->hasMany(Comitente::class, 'servicio_repetivo_id');
    }

    public function entidades()
    {
        return $this->belongsToMany(Entidad::class, 'servicios_repetitivos_entidad');
    }
}