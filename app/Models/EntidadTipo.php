<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EntidadTipo extends Model
{
    use HasFactory;

    protected $table = 'entidad_tipos';

    protected $fillable = [
        'nombre'
    ];

    public function entidades()
    {
        return $this->hasMany(Entidad::class);
    }
}