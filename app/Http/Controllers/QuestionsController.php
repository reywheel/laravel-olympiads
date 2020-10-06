<?php

namespace App\Http\Controllers;

use App\Question;
use Illuminate\Http\Request;

class QuestionsController extends Controller
{
    public function createGet($test_id)
    {
        return view('questions.create_question', [
            'test_id' => $test_id
        ]);
    }

    public function createPost(Request $request)
    {
//        dd($request->all());
        $newQuestion = new Question();
        $newQuestion->text = $request->input('question.text');
        $newQuestion->type = $request->input('question.type');
        $newQuestion->test_id = $request->input('test_id');
        $newQuestion->save();

        return redirect()->route('tests.show-by-id', ['id' => $request->input('test_id')]);
    }
}
