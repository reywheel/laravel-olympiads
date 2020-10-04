@extends('layouts.app')

@section('area')
    <div class="area uk-child-width-expand" uk-grid>
        @include('partials.sidebar')

        <div class="content uk-width-4-5">
            <form class="uk-width-3-5 uk-margin-top" method="POST" action="{{ route('users.update-post') }}">
                <legend class="uk-legend">Редактирование пользователя</legend>

                @csrf
                <input type="hidden" name="id" value="{{ $user->id }}">

                <div class="uk-margin">
                    <input class="uk-input @error('surname') uk-form-danger @enderror" type="text" placeholder="Фамилия" value="{{ $user->surname }}" name="surname">
                    @error('surname')
                        <p class="uk-text-danger uk-text-small uk-margin-small">{{ $message }}</p>
                    @enderror
                </div>
                <div class="uk-margin">
                    <input class="uk-input  @error('name') uk-form-danger @enderror" type="text" placeholder="Имя" value="{{ $user->name }}" name="name">
                    @error('name')
                    <p class="uk-text-danger uk-text-small uk-margin-small">{{ $message }}</p>
                    @enderror
                </div>
                <div class="uk-margin">
                    <input class="uk-input  @error('patronymic') uk-form-danger @enderror" type="text" placeholder="Отчество" value="{{ $user->patronymic }}" name="patronymic">
                    @error('patronymic')
                    <p class="uk-text-danger uk-text-small uk-margin-small">{{ $message }}</p>
                    @enderror
                </div>
                <div class="uk-margin">
                    <input class="uk-input  @error('date_of_birth') uk-form-danger @enderror" type="date" placeholder="Дата рождения" value="{{ $user->date_of_birth }}" name="date_of_birth">
                    @error('date_of_birth')
                    <p class="uk-text-danger uk-text-small uk-margin-small">{{ $message }}</p>
                    @enderror
                </div>
                <div class="uk-margin">
                    <input class="uk-input  @error('school') uk-form-danger @enderror" type="text" placeholder="Школа" value="{{ $user->school }}" name="school">
                    @error('school')
                    <p class="uk-text-danger uk-text-small uk-margin-small">{{ $message }}</p>
                    @enderror
                </div>
                <div class="uk-margin">
                    <button class="uk-button uk-button-primary" type="submit">Сохранить</button>
                </div>

            </form>
        </div>

    </div>
@endsection
