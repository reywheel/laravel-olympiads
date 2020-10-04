@extends('layouts.app')

@section('area')
    <div class="row area">
        @include('partials.sidebar')

        <div class="content col s10">
            <a class="waves-effect waves-light btn"><i class="material-icons left">cloud</i>button</a>
            <table>
                <thead>
                <tr>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Отчество</th>
                    <th>Дата рождения</th>
                    <th>Школа</th>
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
                    </tr>
                @empty
                    <p>No users</p>
                @endforelse
                </tbody>
            </table>
        </div>

    </div>
@endsection
