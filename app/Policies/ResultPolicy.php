<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ResultPolicy
{
    use HandlesAuthorization;

    public function __construct()
    {
        //
    }

    public function read(User $user)
    {
        return $user->isAdmin() || $user->isModerator();
    }
}
