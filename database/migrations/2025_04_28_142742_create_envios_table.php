<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('envios', function (Blueprint $table) {
            $table->id();
            $table->string('numero', 45)->nullable();
            $table->string('fecha', 45)->nullable();
            $table->date('fecha_recepcion')->nullable();
            $table->date('fecha_devolucion')->nullable();
            $table->string('observacion', 65)->nullable();
            $table->foreignId('pasantia_control_id')->constrained('pasantia_controles')->onDelete('cascade');
            $table->foreignId('documento_id')->constrained('documentos')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('envios');
    }
};