<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resolucion extends Model
{
    use HasFactory;

    protected $fillable = [
        'nro', 'fecha', 'expediente_id', 'link', 'tipo'
    ];

    public function expediente()
    {
        return $this->belongsTo(Expediente::class);
    }

    public function convenios()
    {
        return $this->hasMany(Convenio::class);
    }

    public function becas()
    {
        return $this->hasMany(Beca::class);
    }
}