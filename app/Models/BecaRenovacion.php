<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BecaRenovacion extends Model
{
    use HasFactory;

    protected $table = 'beca_renovaciones';

    protected $fillable = [
        'fecha_inicio', 'duracion', 'estado', 'beca_id'
    ];

    public function beca()
    {
        return $this->belongsTo(Beca::class, 'beca_id');
    }
}