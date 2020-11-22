<?php

namespace App\Http\Controllers;

use App\Answer;
use App\Question;
use App\Result;
use App\Test;
use App\TestingTime;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TestingController extends Controller
{
    public function show(Request $request, $test_id)
    {
        if (auth()->user()->cannot('start', Test::find($test_id))) {
            return redirect()->route('tests.show', ['id' => $test_id])->with('status_danger', 'Нет доступа к тесту');
        }

        $this->addTestingStartTime(auth()->user()->id, $test_id);

        $test = Test::where('id', $test_id)->with('questions.answers')->first();
        $test_state = [];

        $test_state['title'] = $test->title;
        $test_state['is_unidirectional'] = $test->is_unidirectional;

        $test_state['questions'] = [];

        foreach ($test->questions as $index => $question) {
            $test_state['questions'][$index]['title'] = $question->title;
            $test_state['questions'][$index]['type'] = $question->type;
            $test_state['questions'][$index]['id'] = $question->id;

            $test_state['questions'][$index]['answers'] = [];

            foreach ($question->answers as $answer) {
                $test_state['questions'][$index]['answers'][] = array_filter($answer->toArray(), function($key) {
                    return $key == 'title';
                }, ARRAY_FILTER_USE_KEY);
            }
        }

        return view('testing.testing', ['state' => json_encode($test_state, JSON_UNESCAPED_UNICODE), 'test_id' => $test_id]);
    }

    public function completePost(Request $request, $id)
    {
        $this->addTestingFinishTime(auth()->user()->id, $id);

        $results = $request->input('results');

        foreach ($results as $result) {
            foreach ($result['values'] as $value) {
                $newResult = new Result();
                $newResult->user_id = auth()->user()->id;
                $newResult->test_id = $id;
                $newResult->question_id = $result['questionId'];
                $newResult->text = $value;
                $newResult->is_correct = $this->resultIsCorrect($value, $result['questionId']);
                $newResult->save();
            }
        }

        return redirect()->route('testing.complete-get', ['id' => $id]);
    }

    public function completeGet(Request $request, $id)
    {
        return redirect()->route('tests.index')->with('status_success', 'Тест успешно завершён');
    }

    private function resultIsCorrect($result, $questionId)
    {
        $answers = Answer::where('question_id', $questionId)->where('is_correct', true)->get();

        foreach ($answers as $answer) {
            if ($answer->title === $result) {
                return true;
            }
        }

        return false;
    }

    private function addTestingStartTime($user_id, $test_id)
    {
        $testing_time_model = TestingTime::where('user_id', $user_id)->where('test_id', $test_id)->first();

        if ($testing_time_model == null) {
            $new_testing_time = new TestingTime();

            $new_testing_time->user_id = $user_id;
            $new_testing_time->test_id = $test_id;
            $new_testing_time->test_id = $test_id;
            $new_testing_time->test_start = Carbon::now();

            $new_testing_time->save();
        }
    }

    private function addTestingFinishTime($user_id, $test_id)
    {
        $testing_time_model = TestingTime::where('user_id', $user_id)->where('test_id', $test_id)->first();
        $testing_time_model->test_finish = Carbon::now();
        $testing_time_model->save();
    }
}
