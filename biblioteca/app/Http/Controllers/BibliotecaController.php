<?php

namespace App\Http\Controllers;

use App\Biblioteca;
use Illuminate\Http\Request;

class BibliotecaController extends Controller
{
    // GET 
    public function index()
    {
        return response()->json(
            Biblioteca::with('libros')->get()
        );
    }

    // POST
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:150',
            'ubicacion' => 'required|string|max:255',
            'libros' => 'array', 
        ]);

        
        $biblioteca = Biblioteca::create($request->only(['nombre', 'ubicacion']));

        // aqui se socia libros desd la tabla de relacion M:M
        if ($request->has('libros') && !empty($request->libros)) {
            $biblioteca->libros()->attach($request->libros);
        }

        
        return response()->json($biblioteca->load('libros'), 201);
    }

    // GET (id) Esta funcion trae una unica biblioteca por su id
    public function show($id)
    {
        $biblioteca = Biblioteca::with('libros')->findOrFail($id);
        return response()->json($biblioteca);
    }

    // PUT (id) esta funcion actualiza un registro de biblioteca por su id
    public function update(Request $request, $id)
    {
        $biblioteca = Biblioteca::findOrFail($id);

        $request->validate([
            'nombre' => 'string|max:150',
            'ubicacion' => 'string|max:255',
            'libros' => 'array',
        ]);

        
        $biblioteca->update($request->only(['nombre', 'ubicacion']));

        // aqui es para actualizar la relación con libros
        if ($request->has('libros')) {
            $biblioteca->libros()->sync($request->libros);
        }

        return response()->json($biblioteca->load('libros'), 200);
    }

    // DELETE (id) aqui en esta funcion se elimina un registro por su id unico 
    public function destroy($id)
    {
        $biblioteca = Biblioteca::findOrFail($id);
        $biblioteca->delete();

        return response()->json(['message' => 'Biblioteca eliminada correctamente']);
    }
}
