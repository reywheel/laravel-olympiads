@extends('layouts.app')

@section('area')
    <section class="register">
        <div class="container">
            <div class="register__inner">
                <form class="register__block z-depth-2" action="{{ route('register') }}" method="POST">
                    @csrf

                    <h4>Регистрация</h4>

                    <div class="input-field">
                        <input id="surname" type="text" class="validate @error('surname') invalid @enderror" name="surname" value="{{ old('surname') }}">
                        <label for="surname">Фамилия</label>
                    </div>

                    <div class="input-field">
                        <input id="name" type="text" class="validate  @error('name') invalid @enderror" name="name" value="{{ old('name') }}">
                        <label for="name">Имя</label>
                    </div>

                    <div class="input-field">
                        <input id="patronymic" type="text" class="validate  @error('patronymic') invalid @enderror" name="patronymic" value="{{ old('patronymic') }}">
                        <label for="patronymic">Отчество</label>
                    </div>

                    <div class="input-field">
                        <input id="date_of_birth" type="date" class="validate  @error('date_of_birth') invalid @enderror" name="date_of_birth" value="{{ old('date_of_birth') }}">
                        <label for="date_of_birth">Дата рождения</label>
                    </div>

                    <div class="input-field">
                        <input id="school" type="text" class="validate  @error('school') invalid @enderror" name="school" value="{{ old('school') }}">
                        <label for="school">Школа</label>
                    </div>

                    <div class="input-field">
                        <input id="email" type="email" class="validate  @error('email') invalid @enderror" name="email" value="{{ old('email') }}">
                        <label for="email">Email</label>
                    </div>

                    <div class="input-field">
                        <input id="password" type="password" class="validate  @error('password') invalid @enderror" name="password">
                        <label for="password">Пароль</label>
                    </div>

                    <div class="input-field">
                        <input id="password_confirmation" type="password" class="validate @error('password_confirmation') invalid @enderror" name="password_confirmation">
                        <label for="password_confirmation">Повторите пароль</label>
                    </div>

                    <p class="register__privacy">
                        <label>
                            <input type="checkbox" class="filled-in" name="privacy_policy" {{ old('remember') ? 'checked' : '' }}"/>
                            <span style="@error('privacy_policy') color: red; @enderror">Cогласен с политикой конфиденциальности</span>
                        </label>
                    </p>

                    <button class="btn waves-effect waves-light register__button-submit" type="submit">Зарегистрироваться
                        <i class="material-icons right">send</i>
                    </button>

                    <a href="{{ route('login') }}" class="register__dop-btn">Уже есть аккаунт?</a>

                </form>
            </div>
        </div>
    </section>
@endsection
