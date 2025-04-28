<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('becas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('alumno_carrera_id')->constrained('alumno_carreras')->onDelete('cascade');
            $table->foreignId('resolucion_id')->constrained('resoluciones')->onDelete('cascade');
            $table->date('fecha_inicio')->nullable();
            $table->integer('duracion')->nullable();
            $table->string('estado', 45)->nullable();
            $table->string('dependencia', 45)->nullable();
            $table->string('sector', 45)->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('becas');
    }
};