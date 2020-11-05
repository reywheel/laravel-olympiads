@extends('layouts.app')

@section('area')
    <div class="area uk-child-width-expand" uk-grid>
        @include('partials.sidebar')

        <div id="test-area"></div>
    </div>

@endsection

@section('footer')
    @parent
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="{{ asset('js/testCreater.js') }}"></script>
    <script>
        let route = "{{ route('tests.create-post') }}";
        let csrf = "{{ csrf_token() }}";
    </script>
@endsection
