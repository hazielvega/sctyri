<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('pasantia_pagos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pasantias_id_pasantia')->constrained('pasantias')->onDelete('cascade');
            $table->foreignId('expediente_tesoreria_idexpedientes')->constrained('expedientes')->onDelete('cascade');
            $table->string('incio_periodo', 45)->nullable();
            $table->string('mes', 45)->nullable();
            $table->string('asignacion_estimulo', 45)->nullable();
            $table->string('asignacion_recibo_de_sueldo', 45)->nullable();
            $table->string('deposito_en_tesoreria', 45)->nullable();
            $table->string('fecha_deposito', 45)->nullable();
            $table->string('observaciones', 45)->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('control_mensual_pasantia');
    }
};