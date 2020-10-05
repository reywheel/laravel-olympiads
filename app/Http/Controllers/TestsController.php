<?php

namespace App\Http\Controllers;

use App\Test;
use Illuminate\Http\Request;

class TestsController extends Controller
{
    public function showAll()
    {
        $all_tests = Test::with('user')->get();
        return view('tests.all_tests', ['tests' => $all_tests]);
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
        $newTest->is_unidirectional = $request->is_unidirectional;
        $newTest->save();

        if ($request->action == 'save_and_add_question') {
            return "Сохранить и добавить вопрос";
        } else {
            return redirect()->route('tests.show-all')->with('status', 'Тест успешно создан');
        }
    }

    public function delete($id)
    {
        Test::destroy($id);
        return redirect()->route('tests.show-all')->with('status', 'Курс успешно удалён');
    }
}
