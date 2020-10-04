<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function showAll(Request $request)
    {
        $users = User::all();

        return view('users.all_users', [
            'users' => $users
        ]);
    }

    public function createGet()
    {
        return view('users.create_user');
    }

    public function createPost(Request $request)
    {
        $this->validate($request, [
            'name' => ['required', 'string', 'max:64'],
            'surname' => ['required', 'string', 'max:64'],
            'patronymic' => ['required', 'string', 'max:64'],
            'date_of_birth' => ['required', 'date'],
            'school' => ['required', 'string', 'max:32'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'password_confirmation' => ['required'],
        ]);

        User::create($request->all());

        return redirect()->route('users.read')->with('status', 'Пользователь успешно добавлен!');
    }

    public function delete($id)
    {
        User::destroy($id);

        return redirect()->route('users.read')->with('status', 'Пользователь успешно удалён!');
    }

    public function updateGet($id)
    {
        $updating_user = User::find($id);
        return view('users.update_user', ['user' => $updating_user]);
    }

    public function updatePost(Request $request)
    {
        $this->validate($request, [
            'name' => ['required', 'string', 'max:64'],
            'surname' => ['required', 'string', 'max:64'],
            'patronymic' => ['required', 'string', 'max:64'],
            'date_of_birth' => ['required', 'date'],
            'school' => ['required', 'string', 'max:32'],
        ]);

        $updating_user = User::find($request->input('id'));
        $updating_user->fill($request->all());
        $updating_user->save();

        return redirect()->route('users.read')->with('status', 'Пользователь успешно отредактирован');
    }
}
