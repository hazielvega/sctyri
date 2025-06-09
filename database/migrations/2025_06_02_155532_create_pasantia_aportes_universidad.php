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
        Schema::create('pasantia_aportes_universidad', function (Blueprint $table) {
            $table->id();
            $table->foreingId('pasantias_id_pasantia')->constrained('pasantias')->onDelete('cascade');
            $table->string('periodo', 45)->nullable();
            $table->strign('monto_aporte', 45)->nullable();
            $table->string('fecha_pago_tesoreria', 45)->nullable();
            $table->string('expediente_tesoreria')
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pasantia_aportes_universidad');
    }
};
