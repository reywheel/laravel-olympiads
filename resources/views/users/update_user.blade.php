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
                    <label class="uk-form-label">Фамилия</label>
                    <input class="uk-input @error('surname') uk-form-danger @enderror" type="text" placeholder="Фамилия" value="{{ $user->surname }}" name="surname">
                    @error('surname')
                        <p class="uk-text-danger uk-text-small uk-margin-small">{{ $message }}</p>
                    @enderror
                </div>
                <div class="uk-margin">
                    <label class="uk-form-label">Имя</label>
                    <input class="uk-input  @error('name') uk-form-danger @enderror" type="text" placeholder="Имя" value="{{ $user->name }}" name="name">
                    @error('name')
                    <p class="uk-text-danger uk-text-small uk-margin-small">{{ $message }}</p>
                    @enderror
                </div>
                <div class="uk-margin">
                    <label class="uk-form-label">Отчество</label>
                    <input class="uk-input  @error('patronymic') uk-form-danger @enderror" type="text" placeholder="Отчество" value="{{ $user->patronymic }}" name="patronymic">
                    @error('patronymic')
                    <p class="uk-text-danger uk-text-small uk-margin-small">{{ $message }}</p>
                    @enderror
                </div>
                <div class="uk-margin">
                    <label class="uk-form-label">Дата рождения</label>
                    <input class="uk-input  @error('date_of_birth') uk-form-danger @enderror" type="date" placeholder="Дата рождения" value="{{ $user->date_of_birth }}" name="date_of_birth">
                    @error('date_of_birth')
                    <p class="uk-text-danger uk-text-small uk-margin-small">{{ $message }}</p>
                    @enderror
                </div>
                <div class="uk-margin">
                    <label class="uk-form-label">Школа</label>
                    <input class="uk-input  @error('school') uk-form-danger @enderror" type="text" placeholder="Школа" value="{{ $user->school }}" name="school">
                    @error('school')
                    <p class="uk-text-danger uk-text-small uk-margin-small">{{ $message }}</p>
                    @enderror
                </div>
                <div class="uk-margin">
                    <label class="uk-form-label">Роль</label>
                    <div class="uk-form-controls">
                        <select class="uk-select" id="form-stacked-select" name="role_id">
                            @foreach ($roles as $role)
                                @if ($role->title === $user->role->title)
                                    <option selected value="{{ $role->id }}">{{ $role->title }}</option>
                                @else
                                    <option value="{{ $role->id }}">{{ $role->title }}</option>
                                @endif
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="uk-grid-small" uk-grid>
                    <div class="uk-margin">
                        <button class="uk-button uk-button-primary" type="submit">Сохранить</button>
                    </div>
                    <div class="uk-margin uk-margin-remove-top">
                        <a href="{{ route('users.read') }}" class="uk-button uk-button-default">Отмена</a>
                    </div>
                </div>

            </form>
        </div>

    </div>
@endsection
