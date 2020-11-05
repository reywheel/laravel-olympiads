<?php

namespace App\Policies;

use App\Test;
use App\TestingTime;
use App\User;
use Carbon\Carbon;
use Illuminate\Auth\Access\HandlesAuthorization;

class TestPolicy
{
    use HandlesAuthorization;

    public function __construct()
    {
        //
    }

    public function start(User $user, Test $test)
    {
        $testing_time_model = TestingTime::where('user_id', $user->id)->where('test_id', $test->id)->first();

//        dd(Carbon::now() >= $test->start_time && Carbon::now() < $test->finish_time);

        // Если время начала теста уже прошло и время конца теста ещё не настало
        if (Carbon::now() >= $test->start_time && Carbon::now() < $test->finish_time) {

            // Если пользователь ещё не начинал тест
            if ($testing_time_model == null) return true;

            // Если пользователь уже начал тест, но ещё не закончил его
            if ($testing_time_model->test_start != null && $testing_time_model->test_finish == null) return true;
        };

        return false;
    }

    public function create(User $user)
    {
        return $user->isAdmin();
    }

    public function update(User $user)
    {
        return $user->isAdmin();
    }

    public function delete(User $user)
    {
        return $user->isAdmin();
    }

    public function readInfo(User $user)
    {
        return $user->isAdmin() || $user->isModerator();
    }


}
