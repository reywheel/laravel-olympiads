<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    protected $fillable = ['title', 'is_unidirectional', 'start_time', 'finish_time'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function testingTimes()
    {
        return $this->hasMany(TestingTime::class);
    }
}
