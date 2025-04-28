<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('beca_renovaciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('beca_formacion_id')->constrained('becas')->onDelete('cascade');
            $table->string('fecha_inicio', 45)->nullable();
            $table->string('duracion', 45)->nullable();
            $table->string('estado', 45)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('beca_renovaciones');
    }
};
