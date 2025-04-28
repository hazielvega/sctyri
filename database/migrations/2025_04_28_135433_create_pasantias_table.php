<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('pasantias', function (Blueprint $table) {
            $table->id();
            $table->date('fecha_acta')->nullable();
            $table->date('fecha_inicio')->nullable();
            $table->integer('duracion')->nullable();
            $table->date('fecha_fin')->nullable();
            $table->string('estado', 45)->nullable();
            $table->string('monto', 45)->nullable();
            $table->string('domicilio', 45)->nullable();
            $table->string('tareas', 100)->nullable();
            $table->foreignId('alumno_carreras_id')->constrained('alumno_carreras')->onDelete('cascade');
            $table->foreignId('docente_id')->constrained('docentes')->onDelete('cascade');
            $table->foreignId('convenio_id')->constrained('convenios')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pasantias');
    }
};