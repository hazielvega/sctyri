<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('pasantia_renovaciones', function (Blueprint $table) {
            $table->id();
            $table->date('fecha_inicio')->nullable();
            $table->integer('duracion')->nullable();
            $table->string('estado', 45)->nullable();
            $table->foreignId('beca_formacion_id')->constrained('becas')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pasantia_renovaciones');
    }
};