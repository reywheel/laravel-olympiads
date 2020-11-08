<?php

namespace App\Http\Controllers;

use App\User;
use App\Role;
use Illuminate\Http\Request;
use Validator;

class UsersController extends Controller
{
    protected $messages = [
        'required' => 'Необходимо указать :attribute.',
    ];

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
        $validate_rules = [
            'name' => ['required', 'string', 'max:64'],
            'surname' => ['required', 'string', 'max:64'],
            'patronymic' => ['required', 'string', 'max:64'],
            'date_of_birth' => ['required', 'date'],
            'school' => ['required', 'string', 'max:32'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'password_confirmation' => ['required']
        ];

        $this->validate($request, $validate_rules);

        User::create($request->all());

        return redirect()->route('users.read')->with('status_success', 'Пользователь успешно добавлен!');
    }

    public function delete($id)
    {
        User::destroy($id);

        return redirect()->route('users.read')->with('status_success', 'Пользователь успешно удалён!');
    }

    public function updateGet($id)
    {
        $updating_user = User::find($id);
        $roles = Role::select(['id', 'title'])->get();

        return view('users.update_user', ['user' => $updating_user, 'roles' => $roles]);
    }

    public function updatePost(Request $request)
    {
        $this->validate($request, [
            'name' => ['required', 'string', 'max:64'],
            'surname' => ['required', 'string', 'max:64'],
            'patronymic' => ['required', 'string', 'max:64'],
            'date_of_birth' => ['required', 'date'],
            'school' => ['required', 'string', 'max:32'],
            'role_id' => ['required', 'integer']
        ]);

        $updating_user = User::find($request->input('id'));
        $updating_user->fill($request->all());
        $updating_user->role_id = Role::find($request->role_id)->id;
        $updating_user->save();

        return redirect()->route('users.read')->with('status_success', 'Пользователь успешно отредактирован');
    }
}
