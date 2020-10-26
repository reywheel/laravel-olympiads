@if(session()->has('status_success'))
    <div class="uk-alert-primary uk-margin-remove-bottom" uk-alert>
        <a class="uk-alert-close" uk-close></a>
        <p>{{ session()->get('status_success') }}</p>
    </div>
@endif
@if(session()->has('status_danger'))
    <div class="uk-alert-danger uk-margin-remove-bottom" uk-alert>
        <a class="uk-alert-close" uk-close></a>
        <p>{{ session()->get('status_danger') }}</p>
    </div>
@endif
