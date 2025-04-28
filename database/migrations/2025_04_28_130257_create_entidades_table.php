<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('entidades', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 45)->nullable();
            $table->foreignId('entidad_tipo_id')->constrained('entidad_tipos')->onDelete('cascade');
            $table->string('cuit', 45)->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('entidades');
    }
};