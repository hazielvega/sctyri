<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ConvenioTipo;

class ConvenioTipoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tipos = [
            "ACTA ACUERDO", 
            "ACTA COMPLEMENTARIA", 
            "ACTA COMPROMISO", 
            "ADHESIÓN", 
            "COLABORACIÓN", 
            "COMISIÓN DE ESTUDIOS", 
            "COOPERACIÓN", 
            "ESPECÍFICO", 
            "MARCO", 
            "PASANTÍA", 
            "PFS", 
            "PPS", 
            "PROTOCOLO ADICIONAL", 
            "PROTOCOLO COLABORACIÓN", 
            "PROTOCOLO ESPECÍFICO", 
            "PROTOCOLO PRACTICA PRE-PROFESIONAL", 
            "SUBVENCIÓN"
        ];

        foreach ($tipos as $tipo) {
            ConvenioTipo::create([
                'nombre' => $tipo
            ]);
        }
    }
}