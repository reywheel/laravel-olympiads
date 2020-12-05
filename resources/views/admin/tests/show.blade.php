@extends('layouts.app')

@section('area')
    <div class="area uk-child-width-expand" uk-grid>
        @include('partials.sidebar')

        <div class="content uk-width-4-5 uk-padding">
            @can('start', $test)
            <a href="{{ route('testing.show', ['id' => $test->id]) }}"
               class="uk-button uk-button-danger uk-margin-bottom">Пройти тест</a>
            @endcan
            @can('read', new \App\Result())
            <a href="{{ route('tests.results', ['test_id' => $test->id]) }}"
               class="uk-button uk-button-secondary uk-margin-bottom">Результаты</a>
            @endcan
            <a href="{{ route('admin/tests.edit', ['test' => $test->id]) }}"
               class="uk-button uk-button-primary uk-margin-bottom">Отредактировать</a>
            <a href="{{ route('admin/tests.index') }}"
               class="uk-button uk-button-default uk-margin-bottom">Вернуться к тестам</a>

            @can('readInfo', new \App\Test())
                <div class="uk-card uk-card-default uk-padding-small uk-margin-bottom">
                    <p class="uk-text-lead">{{ $test->title }}</p>
                    <p class="uk-text-normal"><span class="uk-text-light">Автор:</span> {{ $test->user->surname }} {{ $test->user->name }} {{ $test->user->patronymic }}</p>
                    <p class="uk-margin-remove-bottom">Однонаправленный: {{ ($test->is_unidirectional == 1) ? 'Да' : 'Нет' }}</p>
                    <p>Время начала: {{ $test->start_time }}</p>
                    <p>Время конца: {{ $test->finish_time }}</p>
                </div>

                @forelse($questions as $question)
                    <div class="uk-card uk-card-default uk-margin">
                        <div class="uk-padding-small">
                            <span>{{ $loop->iteration }}. </span>
                            <span class="uk-margin-remove-bottom">{{ $question->title }}</span>
                        </div>
                        <table class="uk-table uk-table-striped uk-table-hover uk-table-justify uk-margin-remove-top">
                            <tbody>
                            @forelse($question->answers as $answer)
                                <tr>
                                    <td class="uk-table-expand"><span class="uk-margin-left">{{ $answer->title }}</span></td>
                                    <td class="uk-width-small">
                                        @if($answer->is_correct)
                                        <span class="uk-text-success" uk-icon="plus-circle"></span>
                                        @else
                                        <span class="uk-text-danger" uk-icon="minus"></span>
                                        @endif
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td><span class="uk-margin-left uk-padding-small">Вариантов ответов нет</span></td>
                                </tr>
                            @endforelse
                            </tbody>
                        </table>
                    </div>
                @empty
                    <div class="uk-card uk-card-default uk-padding-small">
                        <p class="uk-margin-remove">Вопросов нет</p>
                    </div>
                @endforelse
            @endcan

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
