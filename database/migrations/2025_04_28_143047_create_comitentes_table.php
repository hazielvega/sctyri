<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('comitentes', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 45)->nullable();
            $table->string('domicilio', 45)->nullable();
            $table->string('cuit', 45)->nullable();
            $table->foreignId('servicio_repetivo_id')->constrained('servicios_repetivos');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('comitentes');
    }
};