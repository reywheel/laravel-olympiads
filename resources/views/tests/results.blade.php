@extends('layouts.app')

@section('area')
    <div class="area uk-child-width-expand" uk-grid>
        @include('partials.sidebar')

        <div class="content uk-width-4-5 uk-padding">

            @if(session()->has('status'))
                <div class="uk-alert-success" uk-alert>
                    <a class="uk-alert-close" uk-close></a>
                    <p>{{ session()->get('status') }}</p>
                </div>
            @endif

            {{-- table start --}}
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
                            <td><a href="" uk-icon="icon: sign-in"></a></td>
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
