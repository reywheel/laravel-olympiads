@extends('layouts.app')

@section('area')
    <div class="area uk-child-width-expand" uk-grid>
        @include('partials.sidebar')

        <div class="content uk-width-4-5">
            <form class="uk-width-3-5 uk-margin-top" method="POST" action="{{ route('admin/users.store') }}">
                <legend class="uk-legend">Добавление нового пользователя</legend>

                @csrf
                <div class="uk-margin">
                    <input class="uk-input @error('surname') uk-form-danger @enderror" type="text" placeholder="Фамилия"
                           value="{{ old('surname') }}" name="surname">
                    @error('surname')
                    <p class="uk-text-danger uk-text-small uk-margin-small">{{ $message }}</p>
                    @enderror
                </div>
                <div class="uk-margin">
                    <input class="uk-input  @error('name') uk-form-danger @enderror" type="text" placeholder="Имя"
                           value="{{ old('name') }}" name="name">
                    @error('name')
                    <p class="uk-text-danger uk-text-small uk-margin-small">{{ $message }}</p>
                    @enderror
                </div>
                <div class="uk-margin">
                    <input class="uk-input  @error('patronymic') uk-form-danger @enderror" type="text"
                           placeholder="Отчество" value="{{ old('patronymic') }}" name="patronymic">
                    @error('patronymic')
                    <p class="uk-text-danger uk-text-small uk-margin-small">{{ $message }}</p>
                    @enderror
                </div>
                <div class="uk-margin">
                    <input class="uk-input  @error('date_of_birth') uk-form-danger @enderror" type="date"
                           placeholder="Дата рождения" value="{{ old('date_of_birth') }}" name="date_of_birth">
                    @error('date_of_birth')
                    <p class="uk-text-danger uk-text-small uk-margin-small">{{ $message }}</p>
                    @enderror
                </div>
                <div class="uk-margin">
                    <input class="uk-input  @error('school') uk-form-danger @enderror" type="text" placeholder="Школа"
                           value="{{ old('school') }}" name="school">
                    @error('school')
                    <p class="uk-text-danger uk-text-small uk-margin-small">{{ $message }}</p>
                    @enderror
                </div>
                <div class="uk-margin">
                    <input class="uk-input  @error('email') uk-form-danger @enderror" type="email" placeholder="Email"
                           value="{{ old('email') }}" name="email">
                    @error('email')
                    <p class="uk-text-danger uk-text-small uk-margin-small">{{ $message }}</p>
                    @enderror
                </div>
                <div class="uk-margin">
                    <select class="uk-select @error('role_id') uk-form-danger @enderror" name="role_id">
                        @foreach($roles as $role)
                            <option value="{{ $role->id }}">{{ $role->title }}</option>
                        @endforeach
                    </select>
                    @error('role_id')
                    <p class="uk-text-danger uk-text-small uk-margin-small">{{ $message }}</p>
                    @enderror
                </div>
                <div class="uk-margin">
                    <input class="uk-input  @error('password') uk-form-danger @enderror" type="password"
                           placeholder="Пароль" name="password">
                    @error('password')
                    <p class="uk-text-danger uk-text-small uk-margin-small">{{ $message }}</p>
                    @enderror
                </div>
                <div class="uk-margin">
                    <input class="uk-input  @error('password_confirmation') uk-form-danger @enderror" type="password"
                           placeholder="Повторите пароль" name="password_confirmation">
                    @error('password_confirmation')
                    <p class="uk-text-danger uk-text-small uk-margin-small">{{ $message }}</p>
                    @enderror
                </div>
                <div class="uk-grid-small" uk-grid>
                    <div class="uk-margin">
                        <button class="uk-button uk-button-primary" type="submit">Добавить</button>
                    </div>
                    <div class="uk-margin uk-margin-remove-top">
                        <a href="{{ route('admin/users.index') }}" class="uk-button uk-button-default">Отмена</a>
                    </div>
                </div>

            </form>
        </div>

    </div>
@endsection
