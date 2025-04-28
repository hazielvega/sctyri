<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('acta_copias', function (Blueprint $table) {
            $table->id();
            $table->string('pase_numero', 45)->nullable();
            $table->date('fecha_pase')->nullable();
            $table->string('tramite', 45)->nullable();
            $table->string('dirigido_a', 45)->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('acta_copias');
    }
};