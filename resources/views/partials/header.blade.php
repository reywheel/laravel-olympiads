<!doctype html>


<header class="header">
    <div class="container">
        <div class="header__inner">

            <a href="index.html" class="header__logo">Олимпиады</a>

            <div class="header__user-wrapper">
                <div class="header__user">
                    <span class="header__user-name">Андрей</span>
                    <i class="material-icons small header__user-arrow">arrow_drop_down</i>
                </div>
                <ul id='dropdown1' class='header__dropdown-menu'>
                    <li class="header__dropdown-menu-item"><a class="header__dropdown-menu-link" href="#!">Редактировать</a></li>
                    <li class="divider" tabindex="-1"></li>
                    <li class="header__dropdown-menu-item"><a class="header__dropdown-menu-link" href="#" onclick="document.querySelector('#form-logout').submit(); return false;">Выйти</a></li>
                </ul>
                <form action="{{ route('logout') }}" method="POST" id="form-logout" style="display: none">
                    @csrf
                </form>
            </div>

        </div>
    </div>
</header>
