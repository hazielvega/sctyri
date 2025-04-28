<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConvenioTipo extends Model
{
    use HasFactory;

    protected $table = 'convenio_tipos';

    protected $fillable = [
        'nombre'
    ];

    public function convenios()
    {
        return $this->hasMany(Convenio::class);
    }
}