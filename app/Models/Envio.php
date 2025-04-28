<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Envio extends Model
{
    use HasFactory;

    protected $fillable = [
        'numero', 'fecha', 'fecha_recepcion', 'fecha_devolucion',
        'observacion', 'pasantia_control_id', 'documento_id'
    ];

    public function controlPasantia()
    {
        return $this->belongsTo(PasantiaControl::class, 'pasantia_control_id');
    }

    public function documento()
    {
        return $this->belongsTo(Documento::class);
    }
}