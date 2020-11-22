@extends('layouts.app')

@section('area')
    <div class="area uk-child-width-expand" uk-grid>
        @include('partials.sidebar')

        <div class="content uk-width-4-5 uk-padding">

            @if(session()->has('status'))
                <div class="uk-alert-success" uk-alert>
                    <a class="uk-alert-close" uk-close></a>
                    <p>{{ session()->get('status') }}</p>
                </div>
            @endif

            @can('create', new \App\Test())
            <a href="{{ route('admin/tests.create') }}"
               class="uk-button uk-button-primary uk-margin-bottom">Создать новый тест</a>
            @endcan
            {{-- table start --}}
            <div class="uk-card uk-card-default uk-padding-small">
                <table class="uk-table  uk-table-hover uk-table-striped">
                    <thead>
                    <tr>
                        <th>Название</th>
                        @can('readInfo', new \App\Test())
                        <th>Автор</th>
                        <th>Однонаправленный</th>
                        <th>Дата создание</th>
                        <th>Дата последнего изменения</th>
                        <th></th>
                        @endcan
                    </tr>
                    </thead>

                    <tbody>
                    @foreach ($tests as $test)
                        <tr>
                            <td><a href="{{ route('admin/tests.show', ['test' => $test->id]) }}" class="uk-link-heading">{{ $test->title }}</a></td>
                            @can('readInfo', new \App\Test())
                            <td>{{ $test->user->name }}</td>
                            <td>{{ $test->is_unidirectional == 1 ? 'Да' : 'Нет' }}</td>
                            <td>{{ $test->created_at->format('d.m.Y H:i:s') }}</td>
                            <td>{{ $test->updated_at->format('d.m.Y H:i:s') }}</td>
                                @can('delete', new \App\Test())
                                <td>
                                    <ul class="uk-iconnav">
                                        <li>
                                            <a href="{{ route('admin/tests.edit', ['test' => $test->id]) }}"
                                               uk-icon="icon: file-edit"></a>
                                        </li>
                                        <li>
                                            <a href="#" uk-icon="icon: trash"
                                                class="uk-text-danger"
                                                onclick="document.querySelector('#delete_form_{{ $test->id }}').submit(); return false;">
                                            </a>
                                        </li>
                                        <form id="delete_form_{{ $test->id }}" action="{{ route('admin/tests.destroy', ['test' => $test->id]) }}" style="display: none" method="POST">
                                            @method("DELETE")
                                            @csrf
                                        </form>
                                    </ul>
                                </td>
                                @endcan
                            @endcan
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
