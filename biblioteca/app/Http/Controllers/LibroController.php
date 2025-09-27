<?php

namespace App\Http\Controllers;

use App\Libro;
use Illuminate\Http\Request;
use Carbon\Carbon;

class LibroController extends Controller
{
    
    // GET 
    public function index()
    {
        // Se traen todos los libros junto con sus autores relacionados
        $libros = Libro::with('autores')->get();
        return response()->json($libros);
    }

    
    // POST 
    public function store(Request $request)
    {
    
        $request->validate([
            'titulo'      => 'required|string|max:200',
            'publicacion' => 'required|date',     
            'autores'     => 'required|array',
            'autores.*'   => 'exists:autores,id',
        ]);

        //  Creamos el libro con la fecha bien formateada
        $libro = Libro::create([
            'titulo'      => $request->titulo,
            'publicacion' => Carbon::parse($request->publicacion)->format('Y-m-d H:i:s'),
        ]);

        // aqui se socia autores desde la tabla de relacion M:M
        $libro->autores()->attach($request->autores);

        return response()->json($libro->load('autores'), 201);
    }

    // GET ID 
    public function show($id)
    {
        $libro = Libro::with('autores')->findOrFail($id);
        return response()->json($libro);
    }

    //PUT ID, ESTA FUNCION ACTUALIZA O EDITA UN REGISTRO POR SU ID UNICO 
    public function update(Request $request, $id)
    {
        $libro = Libro::findOrFail($id);

        //Validamos solo los campos permitidos
        $request->validate([
            'titulo'      => 'string|max:200',
            'publicacion' => 'date',
            'autores'     => 'array',
            'autores.*'   => 'exists:autores,id',
        ]);

        //  Preparamos los datos
        $data = $request->only(['titulo', 'publicacion']);
        if ($request->filled('publicacion')) {
            $data['publicacion'] = Carbon::parse($request->publicacion)->format('Y-m-d H:i:s');
        }

        // ✅ Actualizamos el libro
        $libro->update($data);

        //  Sincronizamos autores si vienen en la petición
        if ($request->has('autores')) {
            $libro->autores()->sync($request->autores);
        }

        return response()->json($libro->load('autores'), 200);
    }

    

    // DELETE ID ESTA FUNCION ELIMINA UN REGISTRO POR SU ID UNICO 
    public function destroy($id)
    {
        $libro = Libro::findOrFail($id);
        $libro->delete();

        return response()->json(['message' => 'Libro eliminado correctamente']);
    }
}
