<?php

namespace App\Http\Controllers;

use App\Autor; 
use Illuminate\Http\Request;

class AutorController extends Controller
{
    // GET /api/autores
    public function index()
    {
        // 🔹 Traemos autores con sus libros
        return response()->json(
            Autor::with('libros')->get()
        );
    }

    // POST /api/autores
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:150',
            'nacionalidad' => 'nullable|string|max:100',
            'libroIds' => 'array'
        ]);

        $autor = Autor::create($request->only(['nombre', 'nacionalidad']));

        if ($request->has('libroIds')) {
            $autor->libros()->attach($request->libroIds);
        }

        return response()->json($autor->load('libros'), 201);
    }

    // GET /api/autores/{id}
    public function show($id)
    {
        return response()->json(
            Autor::with('libros')->findOrFail($id)
        );
    }

    // PUT /api/autores/{id}
    public function update(Request $request, $id)
    {
        $autor = Autor::findOrFail($id);

        $request->validate([
            'nombre' => 'string|max:150',
            'nacionalidad' => 'nullable|string|max:100',
            'libroIds' => 'array',
        ]);

        $autor->update($request->only(['nombre', 'nacionalidad']));

        if ($request->has('libroIds')) {
            $autor->libros()->sync($request->libroIds);
        }

        return response()->json($autor->load('libros'), 200);
    }

    

    // DELETE /api/autores/{id}
    public function destroy($id)
    {
        $autor = Autor::findOrFail($id);
        $autor->delete();
        return response()->json(['message' => 'Autor eliminado correctamente']);
    }
}
