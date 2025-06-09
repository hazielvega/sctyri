<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActaCopias extends Model
{
    use HasFactory;

    protected $table = 'acta_copias';

    protected $fillable = [
        'pase_numero', 'fecha_pase', 'numero_tramite', 'dirigido_a'
    ];

    public function controlesPasantia()
    {
        return $this->hasMany(PasantiaControl::class, 'acta_copia_id');
    }
}