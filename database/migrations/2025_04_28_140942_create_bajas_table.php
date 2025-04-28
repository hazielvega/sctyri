<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('bajas', function (Blueprint $table) {
            $table->id();
            $table->date('fecha')->nullable();
            $table->string('observaciones', 45)->nullable();
            $table->foreignId('pasantia_id')->constrained('pasantias')->onDelete('cascade');
            $table->foreignId('renovacion_id')->constrained('pasantia_renovaciones')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('bajas');
    }
};