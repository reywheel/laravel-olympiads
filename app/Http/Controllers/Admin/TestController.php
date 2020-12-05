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
            'finish_time' => ['required'],
            'questions' => ['required']
        ]);

        $new_test_id = $this->saveTest($request);

        if (isset($request->questions)) {
            $this->saveQuestionsAndAnswers($request->questions, $new_test_id);
        }

        return response()->json([
            'testUrl' => route('admin/tests.show', ['test' => $new_test_id])
        ], 200);
    }

    public function edit($test_id)
    {
        $test = Test::with('questions')->with('questions.answers')->find($test_id);
        return view('admin.tests.edit', ['test' => $test]);
    }

    public function update(Request $request, $test_id)
    {
        $test = Test::findOrFail($test_id);
        $test->update($request->only(['title', 'is_unidirectional', 'start_time', 'finish_time']));

        Question::where('test_id', $test_id)->delete();

        if (isset($request->questions)) {
            $this->saveQuestionsAndAnswers($request->questions, $test_id);
        }

        return response()->json([
            'testUrl' => route('admin/tests.show', ['test' => $test_id])
        ], 200);
    }

    public function destroy($test_id)
    {
        Test::destroy($test_id);
        return redirect()->route('admin/tests.index')->with('status_success', 'Курс успешно удалён');
    }

    private function saveTest(Request $request) : int {
        $newTest = new Test();
        $newTest->user_id = $request->user()->id;
        $newTest->title = $request->title;
        $newTest->is_unidirectional = $request->is_unidirectional;
        $newTest->start_time = $request->start_time;
        $newTest->finish_time = $request->finish_time;
        $newTest->save();

        return $newTest->id;
    }

    private function saveQuestionsAndAnswers(array $questions, int $test_id) {

            foreach ($questions as $question) {
                switch ($question['type']) {
                    case 'text': $new_question_id = $this->saveTextQuestion($question, $test_id); break;
                    case 'radio': $new_question_id = $this->saveRadioQuestion($question, $test_id); break;
                    case 'checkbox': $new_question_id = $this->saveCheckboxQuestion($question, $test_id); break;
                }
            }
    }

    private function saveTextQuestion($question, $test_id)
    {
        $newQuestion = new Question();
        $newQuestion->title = $question['title'];
        $newQuestion->type = $question['type'];
        $newQuestion->test_id = $test_id;
        $newQuestion->save();

        $this->saveTextAnswer($question['answers'][0]['title'], $newQuestion->id, $question['answers'][0]['exact']);
    }

    private function saveRadioQuestion($question, $test_id)
    {
        $newQuestion = new Question();
        $newQuestion->title = $question['title'];
        $newQuestion->type = $question['type'];
        $newQuestion->test_id = $test_id;
        $newQuestion->save();

        foreach ($question['answers'] as $index => $answer) {
            $is_correct = $question['correctAnswerIndex'] === $index;
            $this->saveRadioAnswer($answer, $newQuestion->id, $is_correct);
        }
    }

    private function saveCheckboxQuestion($question, $test_id)
    {
        $newQuestion = new Question();
        $newQuestion->title = $question['title'];
        $newQuestion->type = $question['type'];
        $newQuestion->test_id = $test_id;
        $newQuestion->save();

        foreach ($question['answers'] as $index => $answer) {
            $this->saveCheckboxAnswer($answer, $newQuestion->id);
        }
    }

    private function saveTextAnswer(string $answer, int $question_id, bool $is_exact) : int
    {
        $newAnswer = new Answer();
        $newAnswer->title = $answer;
        $newAnswer->is_correct = true;
        $newAnswer->exact = $is_exact;
        $newAnswer->question_id = $question_id;
        $newAnswer->save();

        return $newAnswer->id;
    }

    private function saveRadioAnswer(array $answer, int $question_id, bool $is_correct) : int
    {
        $newAnswer = new Answer();
        $newAnswer->title = $answer['title'];
        $newAnswer->is_correct = $is_correct;
        $newAnswer->question_id = $question_id;
        $newAnswer->save();

        return $newAnswer->id;
    }

    private function saveCheckboxAnswer(array $answer, int $question_id) : int
    {
        $newAnswer = new Answer();
        $newAnswer->title = $answer['title'];
        $newAnswer->is_correct = $answer['is_correct'];
        $newAnswer->question_id = $question_id;
        $newAnswer->save();

        return $newAnswer->id;
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

    private function get_number_of_correct_answers_in_test(int $test_id) : int {
        return Answer::with('question')->get()->where('question.test_id', $test_id)->where('is_correct', true)->count();
    }

    private function get_number_of_correct_results_by_user(int $user_id, int $test_id) : int {
        return Result::where('user_id', $user_id)->where('test_id', $test_id)->where('is_correct', true)->count();
    }
}
