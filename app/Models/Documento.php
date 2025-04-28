<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Documento extends Model
{
    use HasFactory;

    protected $fillable = [
        'numero_documento', 'tipo_documento', 'expediente_id'
    ];

    public function expediente()
    {
        return $this->belongsTo(Expediente::class);
    }

    public function envios()
    {
        return $this->hasMany(Envio::class);
    }
}