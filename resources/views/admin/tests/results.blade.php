@extends('layouts.app')

@section('area')
    <div class="area uk-child-width-expand" uk-grid>
        @include('partials.sidebar')

        <div class="content uk-width-4-5 uk-padding">

            <a href="{{ route('admin/tests.show', ['test' => $test_id]) }}" class="uk-button uk-button-primary uk-margin-bottom">Назад</a>

            <div class="uk-card uk-card-default uk-padding-small">
                <table class="uk-table  uk-table-hover uk-table-striped">
                    <thead>
                    <tr>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Отчество</th>
                        <th>Результат</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>

                    @forelse($users as $user)
                        <tr>
                            <td>{{ $user['surname'] }}</td>
                            <td>{{ $user['name'] }}</td>
                            <td>{{ $user['patronymic'] }}</td>
                            <td>{{ $user['number_of_correct_results'] }} из {{ $number_of_correct_answers }}</td>
                            <td><a href="{{ route('admin/tests.user_results', ['test_id' => $test_id, 'user_id' => $user['id']]) }}" uk-icon="icon: sign-in"></a></td>
                        </tr>
                    @empty
                        <tr><td>Ещё никто не прошёл этот тест</td></tr>
                    @endforelse

                    </tbody>

            </div>
            {{-- table end --}}

        </div>

    </div>
@endsection
