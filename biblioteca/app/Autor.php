<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Autor extends Model
{
    protected $table = 'autores';
    protected $fillable = ['nombre', 'nacionalidad'];

    // Relación muchos a muchos con libros
    public function libros()
    {
        return $this->belongsToMany(Libro::class, 'autor_libro', 'autor_id', 'libro_id');
    }
}
