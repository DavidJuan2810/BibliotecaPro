<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Biblioteca extends Model
{
    protected $table = 'bibliotecas'; // tabla en la BD
    protected $fillable = ['nombre', 'ubicacion'];

    // Relación muchos a muchos con libros
    public function libros()
    {
        return $this->belongsToMany(Libro::class, 'biblioteca_libro', 'biblioteca_id', 'libro_id');
    }
}
