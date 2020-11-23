<?php

namespace App\Http\Controllers\Admin;

use App\Answer;
use App\Http\Controllers\Controller;
use App\Question;
use App\Result;
use App\Test;
use App\TestingTime;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function index()
    {
        $all_tests = Test::with('user')->orderByDesc('created_at')->get();

        return view('admin.tests.index', [
            'tests' => $all_tests,
        ]);
    }

    public function show($id)
    {
        $test = Test::where('id', $id)->with('user')->first();
        if (!$test) return redirect()->route('admin/tests.show-all')->with('status_danger', "Такого теста не существует");

        $questions = Question::where('test_id', $id)->with('answers')->get();
        $testing_time = TestingTime::where('test_id', $id)->first();

        if ($testing_time) {
            $is_done = $testing_time->test_finish === null ? false : true;
        } else {
            $is_done = false;
        }

        $is_not_started = Carbon::now() < $test->start_time;
        $is_finished = Carbon::now() > $test->finish_time;

        return view('admin.tests.show', [
            'test' => $test,
            'questions' => $questions,
            'is_done' => $is_done,
            'is_not_started' => $is_not_started,
            'is_finished' => $is_finished
        ]);
    }

    public function create()
    {
        return view('admin.tests.create');
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => ['required'],
            'is_unidirectional' => ['required'],
            'start_time' => ['required'],
            'finish_time' => ['required']
        ]);

        return $request->all();

        $new_test_id = $this->saveTest($request);

        if (isset($request->questions)) {
            foreach ($request->questions as $question) {
                $new_question_id = $this->saveQuestion($question, $new_test_id);

                if (isset($question['answers'])) {
                    foreach ($question['answers'] as $answer) {
                        $this->saveAnswer($answer, $new_question_id);
                    }
                }
            }
        };

        return redirect()->route('admin/tests.show', ['test' => $new_test_id])->with('status_success', 'Тест успешно создан');
    }

    public function edit($test_id)
    {
        // TODO:
        return "Страница редактирования";
    }

    public function update(Request $request, $test_id)
    {
        // TODO:
        return redirect()->route('admin/tests.show', ['test' => $test_id]);
    }

    public function destroy($test_id)
    {
        Test::destroy($test_id);
        return redirect()->route('admin/tests.index')->with('status_success', 'Курс успешно удалён');
    }

    public function showResults(Request $request, $test_id)
    {
        $number_of_correct_answers = $this->get_number_of_correct_answers_in_test($test_id);

        $completions = TestingTime::where('test_id', $test_id)->where('test_finish', '!=', 'null')->with('user')->get();
        $users = array_map(function($user_id) {
            return $user_id[0]['user'];
        }, $completions->groupBy('user_id')->toArray());

        foreach ($users as $user_id => &$user) {
            $user['number_of_correct_results'] = $this->get_number_of_correct_results_by_user($user_id, $test_id);
        }

        return view('admin.tests.results', [
            'test_id' => $test_id,
            'users' => $users,
            'number_of_correct_answers' => $number_of_correct_answers,
        ]);
    }

    public function showUserResults(Request $request, $test_id, $user_id)
    {
        $results_groups = Result::where(['test_id' => $test_id, 'user_id' => $user_id])->with('question')->get()->groupBy('question.title');

        return view('admin.tests.user_results', [
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

    private function saveTest(Request $request) : int {
        $newTest = new Test();
        $newTest->user_id = $request->user()->id;
        $newTest->title = $request->title;
        $newTest->is_unidirectional = $request->is_unidirectional == 'false' ? false : true;
        $newTest->start_time = $request->start_time;
        $newTest->finish_time = $request->finish_time;
        $newTest->save();

        return $newTest->id;
    }

    private function get_number_of_correct_answers_in_test(int $test_id) : int {
        return Answer::with('question')->get()->where('question.test_id', $test_id)->where('is_correct', true)->count();
    }

    private function get_number_of_correct_results_by_user(int $user_id, int $test_id) : int {
        return Result::where('user_id', $user_id)->where('test_id', $test_id)->where('is_correct', true)->count();
    }
}
