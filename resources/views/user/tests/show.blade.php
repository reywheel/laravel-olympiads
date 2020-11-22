@extends('layouts.app')

@section('area')
    <div class="area uk-child-width-expand">

        <div class="content uk-padding">

            <a href="{{ route('tests.index') }}"
               class="uk-button uk-button-default uk-margin-bottom">Вернуться к тестам</a>
            @can('start', $test)
            <a href="{{ route('admin/testing.show', ['id' => $test->id]) }}"
               class="uk-button uk-button-danger uk-margin-bottom">Пройти тест</a>
            @endcan
            @can('read', new \App\Result())
            <a href="{{ route('tests.results', ['test_id' => $test->id]) }}"
               class="uk-button uk-button-secondary uk-margin-bottom">Результаты</a>
            @endcan

                <div class="uk-card uk-card-default uk-padding-small uk-margin-bottom">
                    <p class="uk-text-lead">{{ $test->title }}</p>
                    <p class="uk-margin-remove-bottom">Однонаправленный: {{ ($test->is_unidirectional == 1) ? 'Да' : 'Нет' }}</p>
                    <p>Время начала: {{ $test->start_time }}</p>
                    <p>Время конца: {{ $test->finish_time }}</p>
                </div>

            @if(auth()->user()->isStudent())
                <div class="uk-card uk-card-default uk-card-body">
                    <div>Время начала теста: {{ $test->start_time }}</div>
                    <div>Время окончания теста: {{ $test->finish_time }}</div>

                    @if($is_done)
                        <p class="uk-text-danger">Вы уже прошли этот тест</p>
                    @else
                        @if($is_not_started)
                            <p class="uk-text-danger">Тест ещё не начался</p>
                        @endif
                        @if($is_finished)
                            <p class="uk-text-danger">Тест уже закончился</p>
                        @endif
                    @endif
                </div>
            @endif
        </div>

    </div>
@endsection
