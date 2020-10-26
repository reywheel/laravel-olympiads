<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TestingTime extends Model
{
    protected $table = 'testing_time';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function test()
    {
        return $this->belongsTo(Test::class);
    }
}
