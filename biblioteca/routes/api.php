<?php

use Illuminate\Support\Facades\Route;

//  Rutas públicas
Route::post('register', 'AuthController@register');          
Route::post('login', 'AuthController@login')->name('login');

//  Rutas protegidas
Route::middleware(['auth:api'])->group(function () {
    Route::get('me', 'AuthController@me');             
    Route::post('logout', 'AuthController@logout');    
    Route::post('refresh', 'AuthController@refresh');  

    // Ejemplo de recursos protegidos
    Route::get('autores', 'AutorController@index');             
    Route::get('autores/{id}', 'AutorController@show');         
    Route::post('autores', 'AutorController@store');            
    Route::put('autores/{id}', 'AutorController@update');       
    Route::patch('autores/{id}', 'AutorController@partialUpdate'); 
    Route::delete('autores/{id}', 'AutorController@destroy');   

    Route::get('libros', 'LibroController@index');              
    Route::get('libros/{id}', 'LibroController@show');          
    Route::post('libros', 'LibroController@store');             
    Route::put('libros/{id}', 'LibroController@update');        
    Route::patch('libros/{id}', 'LibroController@partialUpdate'); 
    Route::delete('libros/{id}', 'LibroController@destroy');    

    Route::get('bibliotecas', 'BibliotecaController@index');              
    Route::get('bibliotecas/{id}', 'BibliotecaController@show');          
    Route::post('bibliotecas', 'BibliotecaController@store');             
    Route::put('bibliotecas/{id}', 'BibliotecaController@update');        
    Route::patch('bibliotecas/{id}', 'BibliotecaController@partialUpdate'); 
    Route::delete('bibliotecas/{id}', 'BibliotecaController@destroy');    
});
