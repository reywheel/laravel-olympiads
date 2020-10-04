<!doctype html>


<header class="header">
    <div class="container">
        <div class="header__inner">

            <a href="{{ route('home') }}" class="header__logo">Олимпиады</a>

            @auth
            <div class="header__user-wrapper">
{{--                <div class="header__user">--}}
{{--                    <span class="header__user-name">{{ Auth::user()->name }}</span>--}}
{{--                    <i class="material-icons small header__user-arrow">arrow_drop_down</i>--}}
{{--                </div>--}}

{{--                <ul id='dropdown1' class='header__dropdown-menu'>--}}
{{--                    <li class="header__dropdown-menu-item"><a class="header__dropdown-menu-link" href="#!">Редактировать профиль</a></li>--}}
{{--                    <li class="divider" tabindex="-1"></li>--}}
{{--                    <li class="header__dropdown-menu-item"><a class="header__dropdown-menu-link" href="#" onclick="document.querySelector('#form-logout').submit(); return false;">Выйти</a></li>--}}
{{--                </ul>--}}

                <div class="uk-inline">
                    <button class="uk-button uk-button-default uk-text-capitalize" type="button">
                        <span class="header__user-name uk-text-muted">{{ Auth::user()->name }}</span>
                        <span uk-icon="icon:  triangle-down" class="uk-text-muted"></span>
                    </button>
                    <div uk-dropdown="mode: click; boundary: ! .uk-button-group; boundary-align: false;" class="uk-padding-small">
                        <ul class="uk-nav uk-dropdown-nav">
                            <li><a href="#">Редактировать профиль</a></li>
                            <li><a href="#">Выйти</a></li>
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
