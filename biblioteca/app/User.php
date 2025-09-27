<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;



class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * Los atributos que se pueden asignar en masa
     */
    protected $fillable = [
        'name', 'email', 'password', 'role',
    ];

    /**
     * Los atributos que deben ocultarse en arrays/json
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Los atributos que deben convertirse a tipos nativos
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Métodos requeridos por JWT
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'role' => $this->role   
        ];
    }
}
