@extends('layouts.app')

@section('area')
    <div class="area uk-child-width-expand" uk-grid>
        @include('partials.sidebar')

        <div class="content uk-width-4-5 uk-padding">

            <a href="{{ route('tests.results', ['id' => $test_id]) }}"
               class="uk-button uk-button-primary uk-margin-bottom">Назад</a>

            @forelse($results_groups as $question_title => $results)
                <div class="uk-card uk-card-default uk-margin">
                    <div class="uk-padding-small">
                        <span>{{ $loop->iteration }}. </span>
                        <span class="uk-margin-remove-bottom">{{ $question_title }}</span>
                    </div>
                    <table class="uk-table uk-table-striped uk-table-hover uk-table-justify uk-margin-remove-top">
                        <tbody>
                        @forelse($results as $result)
                            <tr>
                                <td class="uk-table-expand"><span class="uk-margin-left">{{ $result->text }}</span></td>
                                <td class="uk-width-small">
                                    @if($result->is_correct)
                                        <span class="uk-text-success" uk-icon="plus-circle"></span>
                                    @else
                                        <span class="uk-text-danger" uk-icon="minus"></span>
                                    @endif
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td><span class="uk-margin-left uk-padding-small">Вариантов ответов нет</span></td>
                            </tr>
                        @endforelse
                        </tbody>
                    </table>
                </div>
            @empty
                <div class="uk-card uk-card-default uk-padding-small">
                    <p class="uk-margin-remove">Вопросов нет</p>
                </div>
            @endforelse
        </div>
    </div>
@endsection
