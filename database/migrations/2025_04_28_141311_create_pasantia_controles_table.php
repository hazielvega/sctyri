<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('pasantia_controles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pasantia_id')->constrained()->onDelete('cascade');
            $table->date('fecha_firma')->nullable();
            $table->string('observaciones', 100)->nullable();
            $table->date('fecha_archivo', 45)->nullable();
            $table->foreignId('acta_copia_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pasantia_controles');
    }
};