<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    protected $fillable = ['title', 'is_unidirectional', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function questions()
    {
        $this->hasMany(Question::class);
    }
}
