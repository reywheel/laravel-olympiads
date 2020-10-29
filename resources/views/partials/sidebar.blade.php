<section class="sidebar uk-width-1-5">
    <ul class="uk-nav uk-nav-default uk-padding-small">
        <li><a href="{{ route('tests.show-all') }}" class="uk-text-large">Тесты</a></li>
        @can('read', new \App\User())
        <li><a href="{{ route('users.read') }}"  class="uk-text-large">Пользователи</a></li>
        @endcan
    </ul>
</section>
