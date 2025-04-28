<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('convenios', function (Blueprint $table) {
            $table->id();
            $table->date('fecha_firma')->nullable();
            $table->foreignId('tipo_convenio_id')->constrained('convenio_tipos')->onDelete('cascade');
            $table->foreignId('resolucion_id')->constrained('resoluciones')->onDelete('cascade');
            $table->integer('duracion')->nullable();
            $table->boolean('renovable')->nullable();
            $table->date('fecha_fin')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('convenios');
    }
};