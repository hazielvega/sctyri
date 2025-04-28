<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PasantiaPago extends Model
{
    use HasFactory;

    protected $table = 'pasantia_pagos';

    protected $fillable = [
        'pasantias_id_pasantia', 'expediente_tesoreria_idexpedientes',
        'incio_periodo', 'mes', 'asignacion_estimulo', 
        'asignacion_recibo_de_sueldo', 'deposito_en_tesoreria',
        'fecha_deposito', 'observaciones'
    ];

    public function pasantia()
    {
        return $this->belongsTo(Pasantia::class, 'pasantias_id_pasantia');
    }

    public function expedienteTesoreria()
    {
        return $this->belongsTo(Expediente::class, 'expediente_tesoreria_idexpedientes');
    }
}