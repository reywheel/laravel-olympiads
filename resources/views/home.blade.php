@extends('layouts.app')

@section('area')
    <div class="row area">
        @include('partials.sidebar')

        <div class="content col s10" id="js-ajax-content"></div>
    </div>
@endsection

@section('footer')
    @parent
    <script>
        $(function () {
            $('#js-ajax-show-all-users').on('click', function (e) {
                e.preventDefault();
                $.ajax({
                    url: this.href,
                    type: "GET",
                    data: {},
                    headers: {
                        // 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function (data) {
                        $('#js-ajax-content').html(data);
                    },
                    error: function (msg) {
                        alert('Ошибка');
                    }
                });
            });
        })
    </script>
@endsection
