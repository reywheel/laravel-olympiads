@extends('layouts.app')

@section('area')
    <div class="area uk-child-width-expand" uk-grid>
        @include('partials.sidebar')

        <div class="content uk-width-4-5">
            <form method="POST" action="{{ route('tests.create-post') }}" class="uk-margin-large-bottom">

                @csrf
                <div class="uk-card uk-card-default uk-margin-top uk-padding uk-margin-bottom">
                    <legend class="uk-legend">Создание нового теста</legend>
                    <div class="uk-margin-top">
                        <div class="uk-width-3-5">
                            <input class="uk-input @error('title') uk-form-danger @enderror" type="text"
                                   placeholder="Название теста" name="title">
                            @error('title')
                            <p class="uk-text-danger">{{ $message }}</p>
                            @enderror
                        </div>
                        <div class="uk-margin">
                            <div class="uk-form-label">Однонаправленный</div>
                            <div class="uk-form-controls">
                                <label><input class="uk-radio uk-margin-small-right" type="radio" name="is_unidirectional" value="1">Да</label>
                                <br>
                                <label><input class="uk-radio uk-margin-small-right" type="radio" name="is_unidirectional" value="0" checked>Нет</label>
                            </div>
                        </div>
                    </div>
                </div>

                <button class="uk-button uk-button-primary" name="action" value="save">Сохранить</button>
                <button class="uk-button uk-button-primary" name="action" value="save_and_add_question">Сохранить и
                    добавить вопрос
                </button>

            </form>
        </div>
        {{--        <div class="question-adder">--}}
        {{--            <button type="button" class="question-adder__button question-adder__button--text uk-button-primary js-add-text-question">--}}
        {{--                <span uk-icon="bold"></span>--}}
        {{--            </button>--}}
        {{--            <button type="button" class="question-adder__button question-adder__button--radio uk-button-primary js-add-radio-question">--}}
        {{--                <span uk-icon="plus-circle"></span>--}}
        {{--            </button>--}}
        {{--            <button type="button" class="question-adder__button question-adder__button--checkbox uk-button-primary js-add-checkbox-question">--}}
        {{--                <span uk-icon="check"></span>--}}
        {{--            </button>--}}
        {{--        </div>--}}
    </div>


@endsection
