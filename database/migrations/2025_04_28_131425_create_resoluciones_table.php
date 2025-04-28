<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('resoluciones', function (Blueprint $table) {
            $table->id();
            $table->string('nro', 45)->nullable();
            $table->date('fecha')->nullable();
            $table->foreignId('expediente_id')->constrained('expedientes')->onDelete('cascade');
            $table->string('link', 45)->nullable();
            $table->string('tipo', 45)->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('resoluciones');
    }
};