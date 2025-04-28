<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Docente extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre', 'rol'
    ];

    public function pasantias()
    {
        return $this->hasMany(Pasantia::class);
    }
}