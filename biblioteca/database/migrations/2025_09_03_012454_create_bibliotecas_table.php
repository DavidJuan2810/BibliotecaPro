<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBibliotecasTable extends Migration
{
    public function up()
    {
        Schema::create('bibliotecas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nombre', 150);
            $table->string('ubicacion', 255);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('bibliotecas');
    }
}
