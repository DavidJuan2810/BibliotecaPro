<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Libro extends Model
{
    protected $fillable = ['titulo', 'publicacion'];

    // Relación muchos a muchos con autores
    public function autores()
    {
        return $this->belongsToMany(Autor::class, 'autor_libro', 'libro_id', 'autor_id');
    }

    // Relación muchos a muchos con bibliotecas
    public function bibliotecas()
    {
        return $this->belongsToMany(Biblioteca::class, 'biblioteca_libro', 'libro_id', 'biblioteca_id');
    }
}
