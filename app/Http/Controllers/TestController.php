<?php

namespace App\Http\Controllers;

use App\Question;
use App\Test;
use App\TestingTime;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function index()
    {
        $all_tests = Test::with('user')->orderByDesc('created_at')->get();

        return view('user.tests.index', [
            'tests' => $all_tests,
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($test_id)
    {
        $test = Test::where('id', $test_id)->with('user')->first();
        if (!$test) return redirect()->route('admin/tests.show-all')->with('status_danger', "Такого теста не существует");

        $questions = Question::where('test_id', $test_id)->with('answers')->get();
        $testing_time = TestingTime::where('test_id', $test_id)->first();

        if ($testing_time) {
            $is_done = $testing_time->test_finish === null ? false : true;
        } else {
            $is_done = false;
        }

        $is_not_started = Carbon::now() < $test->start_time;
        $is_finished = Carbon::now() > $test->finish_time;

        return view('user.tests.show', [
            'test' => $test,
            'questions' => $questions,
            'is_done' => $is_done,
            'is_not_started' => $is_not_started,
            'is_finished' => $is_finished
        ]);
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
