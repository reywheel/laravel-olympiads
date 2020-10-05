@extends('layouts.app')

@section('area')
    <div class="area uk-child-width-expand" uk-grid>
        @include('partials.sidebar')

        <div class="content uk-width-4-5">

            @if(session()->has('status'))
                <div class="uk-alert-success" uk-alert>
                    <a class="uk-alert-close" uk-close></a>
                    <p>{{ session()->get('status') }}</p>
                </div>
            @endif


            <a href="{{ route('tests.create-get') }}"
               class="uk-button uk-button-primary uk-margin-top uk-margin-bottom">Создать новый тест</a>

            {{-- table start --}}
            <div class="uk-card uk-card-default uk-padding-small">
                <table class="uk-table  uk-table-hover uk-table-striped">
                    <thead>
                    <tr>
                        <th>Название</th>
                        <th>Автор</th>
                        <th>Однонаправленный</th>
                        <th>Дата создание</th>
                        <th>Дата последнего изменения</th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody>
                    @foreach ($tests as $test)
                        <tr>
                            <td>{{ $test->title }}</td>
                            <td>{{ $test->user->name }}</td>
                            <td>{{ $test->is_unidirectional }}</td>
                            <td>{{ $test->created_at->format('d.m.Y H:i:s') }}</td>
                            <td>{{ $test->updated_at->format('d.m.Y H:i:s') }}</td>
                            <td>
                                <ul class="uk-iconnav">
                                    <li><a href="{{ route('tests.update-get', ['id' => $test->id]) }}"
                                           uk-icon="icon: file-edit"></a></li>
                                    <li><a href="{{ route('tests.delete', ['id' => $test->id]) }}" uk-icon="icon: trash"
                                           class="uk-text-danger"></a></li>
                                </ul>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
                @if(count($tests) == 0)
                    <p class="uk-margin-small-left">Тестов нет</p>
                @endif
            </div>
            {{-- table end --}}

        </div>

    </div>
@endsection
