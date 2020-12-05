@extends('layouts.app')

@section('area')
    <div class="area uk-child-width-expand" uk-grid>
        @include('partials.sidebar')

        <div class="content uk-width-4-5 uk-padding" id="app">
            <test-updater url="{{ route('admin/tests.update', ['test' => $test->id]) }}" initial-data="{{ $test }}"></test-updater>
        </div>
    </div>

@endsection

@section('footer')
    @parent
    <script>
        let route = "{{ route('admin/tests.store') }}";
        let csrf = "{{ csrf_token() }}";
    </script>
@endsection
