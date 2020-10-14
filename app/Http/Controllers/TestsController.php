<?php

namespace App\Http\Controllers;

use App\Answer;
use App\Question;
use App\Test;
use Illuminate\Http\Request;

class TestsController extends Controller
{
    public function showAll()
    {
        $all_tests = Test::with('user')->orderByDesc('created_at')->get();
        return view('tests.all_tests', ['tests' => $all_tests]);
    }

    public function showById($id)
    {
        $test = Test::where('id', $id)->with('user')->first();
        $questions = Question::where('test_id', $id)->with('answers')->get();

        return view('tests.test', [
            'test' => $test,
            'questions' => $questions
        ]);
    }

    public function createGet()
    {
        return view('tests.create_test');
    }

    public function createPost(Request $request)
    {
        $this->validate($request, [
           'title' => ['required'],
           'is_unidirectional' => ['required']
        ]);

        $newTest = new Test();
        $newTest->user_id = $request->user()->id;
        $newTest->title = $request->title;
        $newTest->is_unidirectional = $request->is_unidirectional == 'false' ? false : true;
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
