<?php

namespace App\Http\Middleware;

use Closure;

class Cors
{
    /**
     * Maneja las solicitudes entrantes y agrega los headers CORS.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $headers = [
            'Access-Control-Allow-Origin'      => '*', // O tu dominio específico: http://localhost:5173
            'Access-Control-Allow-Methods'     => 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers'     => 'Content-Type, Authorization, X-Requested-With',
        ];

        // Si es una preflight request (OPTIONS), respondemos sin pasar al controlador
        if ($request->getMethod() === "OPTIONS") {
            return response()->json('OK', 200, $headers);
        }

        $response = $next($request);

        // Agregamos headers CORS a la respuesta
        foreach ($headers as $key => $value) {
            $response->headers->set($key, $value);
        }

        return $response;
    }
}
