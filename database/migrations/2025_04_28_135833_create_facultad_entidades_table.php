<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('facultad_entidades', function (Blueprint $table) {
            $table->id();
            $table->foreignId('entidad_id')->constrained('entidades')->onDelete('cascade');
            $table->foreignId('facultad_id')->constrained('facultades')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('entidades_facultades');
    }
};