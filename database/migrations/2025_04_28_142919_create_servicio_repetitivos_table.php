<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('servicios_repetivos', function (Blueprint $table) {
            $table->id();
            $table->date('fecha')->nullable();
            $table->string('apellido_responsable_sr', 45)->nullable();
            $table->string('nombre_responsable_sr', 45)->nullable();
            $table->string('detalle_tarea_sr', 45)->nullable();
            $table->string('forma_de_pago_sr', 45)->nullable();
            $table->string('monto_total_sr', 45)->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('servicios_repetivos');
    }
};