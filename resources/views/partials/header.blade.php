<!doctype html>


<header class="header">
    <div class="container">
        <div class="header__inner">

            <a href="{{ route('home') }}" class="header__logo">Олимпиады</a>

            @auth
            <div class="header__user-wrapper">
                <div class="uk-inline">
                    <button class="uk-button uk-button-default uk-text-capitalize" type="button">
                        <span class="header__user-name uk-text-muted">{{ Auth::user()->name }}</span>
                        <span uk-icon="icon:  triangle-down" class="uk-text-muted"></span>
                    </button>
                    <div uk-dropdown="mode: click; boundary: ! .uk-button-group; boundary-align: false;" class="uk-padding-small">
                        <ul class="uk-nav uk-dropdown-nav">
                            <li><a href="#">Редактировать профиль</a></li>
                            <li><a href="#" onclick="document.querySelector('#form-logout').submit(); return false;">Выйти</a></li>
                        </ul>
                    </div>
                </div>
                <form action="{{ route('logout') }}" method="POST" id="form-logout" style="display: none">
                    @csrf
                </form>
            </div>
            @endauth

        </div>
    </div>
</header>
