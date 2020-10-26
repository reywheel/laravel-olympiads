@extends('layouts.app')

@section('area')
    <section class="register">
        <div class="container">
            <div class="register__inner">
                <form class="uk-card uk-card-default uk-card-body uk-margin-large-top uk-margin-large-bottom" action="{{ route('register') }}" method="POST">
                    @csrf

                    <h4 class="uk-card-title uk-margin-remove-top">Регистрация</h4>

                    <div class="uk-margin">
                        <input id="surname" type="text" class="uk-input @error('surname') uk-form-danger @enderror"
                               name="surname" value="{{ old('surname') }}" placeholder="Фамилия">
                        @error('surname')
                        <span class="uk-text-danger">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="uk-margin">
                        <input id="name" type="text" class="uk-input  @error('name') uk-form-danger @enderror"
                               name="name" value="{{ old('name') }}" placeholder="Имя">
                        @error('name')
                        <span class="uk-text-danger">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="uk-margin">
                        <input id="patronymic" type="text"
                               class="uk-input  @error('patronymic') uk-form-danger @enderror" name="patronymic"
                               value="{{ old('patronymic') }}" placeholder="Отчество">
                        @error('patronymic')
                        <span class="uk-text-danger">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="uk-margin">
                        <input id="date_of_birth" type="date"
                               class="uk-input  @error('date_of_birth') uk-form-danger @enderror" name="date_of_birth"
                               value="{{ old('date_of_birth') }}" placeholder="Дата рождения">
                        @error('date_of_birth')
                        <span class="uk-text-danger">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="uk-margin">
                        <input id="school" type="text" class="uk-input  @error('school') uk-form-danger @enderror"
                               name="school" value="{{ old('school') }}" placeholder="Школа">
                        @error('school')
                        <span class="uk-text-danger">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="uk-margin">
                        <input id="email" type="email" class="uk-input  @error('email') uk-form-danger @enderror"
                               name="email" value="{{ old('email') }}" placeholder="Email">
                        @error('email')
                        <span class="uk-text-danger">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="uk-margin">
                        <input id="password" type="password"
                               class="uk-input  @error('password') uk-form-danger @enderror" name="password"
                               placeholder="Пароль">
                        @error('password')
                        <span class="uk-text-danger">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="uk-margin">
                        <input id="password_confirmation" type="password"
                               class="uk-input @error('password_confirmation') uk-form-danger @enderror"
                               name="password_confirmation" placeholder="Повторите пароль">
                        @error('password_confirmation')
                        <span class="uk-text-danger">{{ $message }}</span>
                        @enderror
                    </div>

                    <p class="register__privacy">
                        <label>
                            <input type="checkbox" class="filled-in"
                                   name="privacy_policy" {{ old('remember') ? 'checked' : '' }}"/>
                            <span class="@error('privacy_policy') uk-text-danger @enderror">Cогласен с политикой конфиденциальности</span>
                        </label>
                    </p>

                    <button class="uk-button uk-button-primary" type="submit">Зарегистрироваться</button>

                    <a href="{{ route('login') }}" class="uk-margin-left">Уже есть аккаунт?</a>

                </form>
            </div>
        </div>
    </section>
@endsection
