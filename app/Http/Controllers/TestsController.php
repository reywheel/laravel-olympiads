<?php

namespace App\Http\Controllers;

use App\Answer;
use App\Question;
use App\Result;
use App\Test;
use App\TestingTime;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TestsController extends Controller
{
    public function showAll()
    {
        $all_tests = Test::with('user')->orderByDesc('created_at')->get();

        return view('tests.all_tests', [
            'tests' => $all_tests,
        ]);
    }

    public function showById($id)
    {
        $test = Test::where('id', $id)->with('user')->first();
        $questions = Question::where('test_id', $id)->with('answers')->get();
        $testing_time = TestingTime::where('test_id', $id)->first();

        if ($testing_time) {
            $is_done = $testing_time->test_finish === null ? false : true;
        } else {
            $is_done = false;
        }

        $is_not_started = Carbon::now() < $test->start_time;
        $is_finished = Carbon::now() > $test->finish_time;

        return view('tests.test', [
            'test' => $test,
            'questions' => $questions,
            'is_done' => $is_done,
            'is_not_started' => $is_not_started,
            'is_finished' => $is_finished
        ]);
    }

    public function createGet()
    {
        return view('tests.create_test');
    }

    public function createPost(Request $request)
    {
//        dd($request->all());

        $this->validate($request, [
            'title' => ['required'],
            'is_unidirectional' => ['required'],
            'start_time' => ['required'],
            'finish_time' => ['required']
        ]);

        $newTest = new Test();
        $newTest->user_id = $request->user()->id;
        $newTest->title = $request->title;
        $newTest->is_unidirectional = $request->is_unidirectional == 'false' ? false : true;
        $newTest->start_time = $request->start_time;
        $newTest->finish_time = $request->finish_time;
        $newTest->save();

        if (isset($request->questions)) {
            foreach ($request->questions as $question) {
                $new_question_id = $this->saveQuestion($question, $newTest->id);

                if (isset($question['answers'])) {
                    foreach ($question['answers'] as $answer) {
                        $this->saveAnswer($answer, $new_question_id);
                    }
                }
            }
        };

        return redirect()->route('tests.show-by-id', ['id' => $newTest->id])->with('status', 'Тест успешно создан');
    }

    public function delete($id)
    {
        Test::destroy($id);
        return redirect()->route('tests.show-all')->with('status', 'Курс успешно удалён');
    }

    public function showResults(Request $request, $test_id)
    {
        $number_of_correct_answers = Answer::where('is_correct', true)->whereHas('question', function($query) use ($test_id) {
            $query->where('test_id', $test_id);
        })->get()->count();

        $completions = TestingTime::where('test_id', $test_id)->where('test_finish', '!=', 'null')->with('user')->get();
        $users = array_map(function($user_id) {
            return $user_id[0]['user'];
        }, $completions->groupBy('user_id')->toArray());

        foreach ($users as $id => &$user) {
            $user['number_of_correct_results'] = Result::where('user_id', $id)->where('test_id', $test_id)->where('is_correct', true)->count();
        }

        return view('tests.results', [
            'test_id' => $test_id,
            'users' => $users,
            'number_of_correct_answers' => $number_of_correct_answers,
        ]);
    }

    public function showUserResults(Request $request, $test_id, $user_id)
    {
        $results_groups = Result::where(['test_id' => $test_id, 'user_id' => $user_id])->with('question')->get()->groupBy('question.title');

        return view('tests.user_results', [
            'results_groups' => $results_groups,
            'test_id' => $test_id
        ]);
    }

    private function saveQuestion($question, $test_id)
    {
        $newQuestion = new Question();
        $newQuestion->title = $question['title'];
        $newQuestion->type = $question['type'];
        $newQuestion->test_id = $test_id;
        $newQuestion->save();

        return $newQuestion->id;
    }

    private function saveAnswer($answer, $question_id)
    {
        $newAnswer = new Answer();
        $newAnswer->title = $answer['title'];
        $newAnswer->is_correct = isset($answer['is_correct']) ? true : false;
        $newAnswer->question_id = $question_id;
        $newAnswer->save();

        return $newAnswer->id;
    }
}
