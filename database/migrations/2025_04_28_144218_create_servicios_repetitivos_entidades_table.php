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
        Schema::create('servicios_repetitivos_entidades', function (Blueprint $table) {
            $table->id();
            $table->foreignId('servicio_repetitivo_id')->constrained('servicios_repetivos')->onDelete('cascade');
            $table->foreignId('entidad_id')->constrained('entidades')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('servicios_repetitivos_entidades');
    }
};
