@extends('layouts.app')

@section('area')
    <div class="area uk-child-width-expand" uk-grid>
        @include('partials.sidebar')

        <div class="content uk-width-4-5 uk-padding">

            <div id="testing"></div>

        </div>

    </div>
@endsection

@section('footer')
    @parent
    <script>
        let state = {!! $state !!};
        let route = "{{ route('testing.complete-post', ['id' => $test_id]) }}";
        let csrf = "{{ csrf_token() }}";
    </script>
    <script src="https://unpkg.com/vuex"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="{{ asset('js/tester.js') }}"></script>
@endsection
