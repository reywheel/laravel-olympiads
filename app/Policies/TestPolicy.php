<?php

namespace App\Policies;

use App\Test;
use App\TestingTime;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TestPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function start(User $user, Test $test)
    {
        $testing_time_model = TestingTime::where('user_id', $user->id)->where('test_id', $test->id)->first();

        if ($testing_time_model == null) {
            return true;
        }

        if ($testing_time_model->test_start != null && $testing_time_model->test_finish == null) {
            return true;
        }

        return false;
    }
}
