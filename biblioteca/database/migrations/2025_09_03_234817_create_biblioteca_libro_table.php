<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBibliotecaLibroTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('biblioteca_libro', function (Blueprint $table) {
            // Campos de relación
            $table->unsignedBigInteger('biblioteca_id');
            $table->unsignedBigInteger('libro_id');

            // Claves foráneas
            $table->foreign('biblioteca_id')
                  ->references('id')->on('bibliotecas')
                  ->onDelete('cascade');

            $table->foreign('libro_id')
                  ->references('id')->on('libros')
                  ->onDelete('cascade');

            // Evitar duplicados en la relación
            $table->primary(['biblioteca_id', 'libro_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('biblioteca_libro');
    }
}
