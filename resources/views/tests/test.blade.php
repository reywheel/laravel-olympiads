@extends('layouts.app')

@section('area')
    <div class="area uk-child-width-expand" uk-grid>
        @include('partials.sidebar')

        <div class="content uk-width-4-5">
            <a href="{{ route('questions.create-get', ['id' => $test->id]) }}"
               class="uk-button uk-button-primary uk-margin-top uk-margin-bottom">Добавить вопрос</a>
            <a href="{{ route('tests.show-all') }}"
               class="uk-button uk-button-default uk-margin-top uk-margin-bottom">Вернуться обратно</a>

            {{-- table start --}}
            <div class="uk-card uk-card-default uk-padding-small uk-margin-bottom">
                <p class="uk-text-lead">{{ $test->title }}</p>
                <p class="uk-text-normal"><span class="uk-text-light">Автор:</span> {{ $test->user->surname }} {{ $test->user->name }} {{ $test->user->patronymic }}</p>
                <p class="uk-margin-remove-bottom">Однонаправленный: {{ ($test->is_unidirectional == 1) ? 'Да' : 'Нет' }}</p>
            </div>

            @forelse($questions as $question)
                <div class="uk-card uk-card-default uk-padding-small">
                    <p>{{ $question->text }}</p>
                </div>
            @empty
                <div class="uk-card uk-card-default uk-padding-small">
                    <p class="uk-margin-remove">Вопросов нет</p>
                </div>
            @endforelse
        </div>

    </div>
@endsection
