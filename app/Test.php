<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    protected $fillable = ['title', 'unidirectional', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
