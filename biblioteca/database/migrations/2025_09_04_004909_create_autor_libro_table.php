<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAutorLibroTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('autor_libro', function (Blueprint $table) {
            // Campos de relación
            $table->unsignedBigInteger('autor_id');
            $table->unsignedBigInteger('libro_id');

            // Definimos las relaciones con sus tablas
            $table->foreign('autor_id')
                  ->references('id')->on('autores') // ✅ ahora apunta a 'autores'
                  ->onDelete('cascade');

            $table->foreign('libro_id')
                  ->references('id')->on('libros')
                  ->onDelete('cascade');

            // Clave primaria compuesta
            $table->primary(['autor_id', 'libro_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('autor_libro');
    }
}
