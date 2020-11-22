@extends('layouts.app')

@section('area')
    <div class="area uk-child-width-expand">
        <div class="content uk-padding">

            {{-- table start --}}
            <div class="uk-card uk-card-default uk-padding-small">
                <table class="uk-table  uk-table-hover uk-table-striped">
                    <thead>
                    <tr>
                        <th>Название</th>
                    </tr>
                    </thead>

                    <tbody>
                    @foreach ($tests as $test)
                        <tr>
                            <td>
                                <a href="{{ route('tests.show', ['test' => $test->id]) }}" class="uk-link-heading">{{ $test->title }}</a>
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
