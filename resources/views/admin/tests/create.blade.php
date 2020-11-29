@extends('layouts.app')

@section('area')
    <div class="area uk-child-width-expand" uk-grid>
        @include('partials.sidebar')

        <div class="content uk-width-4-5 uk-padding" id="app">
            <test-creator url="{{ route('admin/tests.store') }}"></test-creator>
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
