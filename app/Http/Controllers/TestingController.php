<?php

namespace App\Http\Controllers;

use App\Test;
use Illuminate\Http\Request;

class TestingController extends Controller
{
    public function show(Request $request, $id) {
        $test = Test::where('id', $id)->with('questions.answers')->first();
        $test_state = [];

        $test_state['title'] = $test->title;
        $test_state['is_unidirectional'] = $test->is_unidirectional;

        $test_state['questions'] = [];

        foreach ($test->questions as $index => $question) {
            $test_state['questions'][$index]['title'] = $question->title;
            $test_state['questions'][$index]['type'] = $question->type;

            $test_state['questions'][$index]['answers'] = [];

            foreach ($question->answers as $answer) {
                $test_state['questions'][$index]['answers'][] = array_filter($answer->toArray(), function($key) {
                    return $key == 'title';
                }, ARRAY_FILTER_USE_KEY);
            }
        }

        return view('testing.testing', ['state' => json_encode($test_state, JSON_UNESCAPED_UNICODE)]);
    }
}
