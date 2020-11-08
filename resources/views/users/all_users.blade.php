@extends('layouts.app')

@section('area')
    <div class="area uk-child-width-expand" uk-grid>
        @include('partials.sidebar')

        <div class="content uk-width-4-5 uk-padding">

            <a href="{{ route('users.create-get') }}"
               class="uk-button uk-button-primary uk-margin-bottom">Добавить пользователя</a>

            {{-- table start --}}
            <div class="uk-card uk-card-default uk-padding-small">
                <table class="uk-table  uk-table-hover uk-table-striped">
                    <thead>
                    <tr>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Отчество</th>
                        <th>Дата рождения</th>
                        <th>Школа</th>
                        <th>Email</th>
                        <th>Роль</th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody>
                    @forelse ($users as $user)
                        <tr>
                            <td>{{ $user->surname }}</td>
                            <td>{{ $user->name }}</td>
                            <td>{{ $user->patronymic }}</td>
                            <td>{{ DateTime::createFromFormat('Y-m-d', $user->date_of_birth)->format('d.m.Y') }}</td>
                            <td>{{ $user->school }}</td>
                            <td>{{ $user->email }}</td>
                            <td>{{ $user->role->title }}</td>
                            <td>
                                <ul class="uk-iconnav">
                                    <li><a href="{{ route('users.update-get', ['id' => $user->id]) }}"
                                           uk-icon="icon: file-edit"></a></li>
                                    <li><a href="{{ route('users.delete', ['id' => $user->id]) }}" uk-icon="icon: trash"
                                           class="uk-text-danger"></a></li>
                                </ul>
                            </td>
                        </tr>
                    @empty
                        <p>No users</p>
                    @endforelse
                    </tbody>
                </table>
            </div>
            {{-- table end --}}

        </div>

    </div>
@endsection
