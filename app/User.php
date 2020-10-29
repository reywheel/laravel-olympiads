<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'surname', 'patronymic', 'date_of_birth', 'school', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function tests()
    {
        return $this->hasMany(Test::class);
    }

    public function testingTimes()
    {
        return $this->hasMany(TestingTime::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function isAdmin()
    {
        return auth()->user()->role->title === 'admin';
    }

    public function isModerator()
    {
        return auth()->user()->role->title === 'moderator';
    }

    public function isTeacher()
    {
        return auth()->user()->role->title === 'teacher';
    }

    public function isStudent()
    {
        return auth()->user()->role->title === 'student';
    }
}
