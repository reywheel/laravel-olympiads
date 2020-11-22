<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\User;
use App\Role;
use Illuminate\Http\Request;
use Validator;
use Hash;

class UserController extends Controller
{
    protected $messages = [
        'required' => 'Необходимо указать :attribute.',
    ];

    public function index(Request $request)
    {
        $users = User::all();

        return view('admin.users.index', [
            'users' => $users
        ]);
    }

    public function create()
    {
        return view('admin.users.create');
    }

    public function store(Request $request)
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

        $user_data = array_merge($request->all(), ['password' => Hash::make($request->password)]);
        User::create($user_data);

        return redirect()->route('admin/users.index')->with('status_success', 'Пользователь успешно добавлен!');
    }

    public function edit($id)
    {
        $updating_user = User::find($id);
        $roles = Role::select(['id', 'title'])->get();

        return view('admin.users.edit', ['user' => $updating_user, 'roles' => $roles]);
    }

    public function update(Request $request, $id)
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

        return redirect()->route('admin/users.index')->with('status_success', 'Пользователь успешно отредактирован');
    }

    public function destroy($user_id)
    {
        $result = User::destroy($user_id);
        return redirect()->route('admin/users.index')->with('status_success', 'Пользователь успешно удалён!');
    }
}
