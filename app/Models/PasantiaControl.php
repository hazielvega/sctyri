<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PasantiaControl extends Model
{
    use HasFactory;

    protected $table = 'pasantia_controles';

    protected $fillable = [
        'pasantia_id', 'fecha_firma', 'observaciones', 
        'fecha_archivo', 'acta_copia_id'
    ];

    public function scopeFechaFirmaBeforeFechaArchivo($query)
    {
        return $query->where('fecha_firma', '<', 'fecha_archivo');
    }

    public function pasantia()
    {
        return $this->belongsTo(Pasantia::class);
    }

    public function actaCopia()
    {
        return $this->belongsTo(ActaCopias::class, 'acta_copia_id');
    }

    public function envios()
    {
        return $this->hasMany(Envio::class, 'pasantia_control_id');
    }
}