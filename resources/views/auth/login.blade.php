@extends('layouts.app')

@section('area')
<section class="login">
    <div class="container">
        <div class="login__inner">
            <form class="uk-card uk-card-default uk-card-body" action="{{ route('login') }}" method="POST">
                @csrf

                <h4 class="uk-card-title uk-margin-remove-top">Вход</h4>

                <div class="uk-margin">
                    <input id="email" type="email" class="uk-input @error('email') uk-form-danger @enderror" value="{{ old('email') }}" name="email" placeholder="Email">
                    @error('email')
                    <span class="uk-text-danger">{{ $message }}</span>
                    @enderror
                </div>

                <div class="uk-margin">
                    <input id="password" type="password" class="uk-input @error('password') uk-form-danger @enderror" name="password" placeholder="Пароль">
                    @error('password')
                    <span class="uk-text-danger">{{ $message }}</span>
                    @enderror
                </div>

                <button class="uk-button uk-button-primary" type="submit">Войти</button>

                <div class="uk-margin-top">
                    <a href="{{ route('password.request') }}" class="uk-margin-right">Забыли пароль?</a>
                    <a href="{{ route('register') }}">Ещё не зарегистрированы?</a>
                </div>

            </form>
        </div>
    </div>
</section>
@endsection
