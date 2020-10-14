<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    public function test()
    {
        $this->belongsTo(Test::class);
    }

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }
}
