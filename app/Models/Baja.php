<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Baja extends Model
{
    use HasFactory;

    protected $fillable = [
        'fecha', 'observaciones', 'pasantia_id', 'renovacion_id'
    ];

    public function pasantia()
    {
        return $this->belongsTo(Pasantia::class);
    }

    public function renovacion()
    {
        return $this->belongsTo(PasantiaRenovacion::class, 'renovacion_id');
    }
}