@extends('layouts.app')

@section('area')
    <div class="area uk-child-width-expand" uk-grid>
        @include('partials.sidebar')

        <div class="content uk-width-4-5">

            <div class="uk-card uk-card-default uk-margin-top uk-padding uk-margin-bottom">
                <p class="uk-text-lead uk-margin-remove-bottom">Создание нового вопроса</p>
            </div>

            <button class="uk-button uk-button-primary js-add-text-question">Текстовое поле</button>
            <button class="uk-button uk-button-primary js-add-radio-question">Единичный выбор</button>
{{--            <button class="uk-button uk-button-primary">Множественный выбор</button>--}}

            <form method="POST" action="{{ route('questions.create-post', ['id' => $test_id]) }}" class="uk-margin-large-bottom uk-margin-top">

                @csrf
                <input type="hidden" name="test_id" value="{{ $test_id }}">

                <div class="js-question-area">
                    <div class="uk-card uk-card-default uk-padding uk-margin-bottom js-question-card">
                        <div class="uk-margin">
                            <input class="uk-input uk-width-3-5" type="text" placeholder="Текст вопроса" name="question[text]" required>
                            <input type="hidden" name="question[type]" value="radio">
                            <button class="uk-button uk-button-primary">Добавить вариант ответа</button>
                        </div>
                        <p>Варианты ответов</p>
                        <input class="uk-input uk-width-3-5 uk-margin uk-margin-remove-top uk-margin-right" type="text" placeholder="Текст ответа" name="question[answers][0][title]" required>
                        <input class="uk-checkbox" type="checkbox" name="question[answers][0][is_true]">
                        <input class="uk-input uk-width-3-5 uk-margin uk-margin-remove-top uk-margin-right" type="text" placeholder="Текст ответа" name="question[answers][1][title]" required>
                        <input class="uk-checkbox" type="checkbox" name="question[answers][1][is_true]">
                        <input class="uk-input uk-width-3-5 uk-margin uk-margin-remove-top uk-margin-right" type="text" placeholder="Текст ответа" name="question[answers][2][title]" required>
                        <input class="uk-checkbox" type="checkbox" name="question[answers][2][is_true]">
                        <input class="uk-input uk-width-3-5 uk-margin uk-margin-remove-top uk-margin-right" type="text" placeholder="Текст ответа" name="question[answers][3][title]" required>
                        <input class="uk-checkbox" type="checkbox" name="question[answers][3][is_true]">
                    </div>
                </div>
                <button type="submit" class="uk-button uk-button-primary">Сохранить</button>
                <a href="{{ route('tests.show-by-id', ['id' => $test_id]) }}" class="uk-button uk-button-default">Отмена</a>

            </form>
        </div>
    </div>


@endsection
