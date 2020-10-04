<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class AjaxController extends Controller
{
    public function index()
    {

    }

    public function showAllUsers()
    {
        $users = User::all();
        return view('ajax.users', [
            'users' => $users
        ]);
    }
}
