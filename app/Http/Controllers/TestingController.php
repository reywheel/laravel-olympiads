<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestingController extends Controller
{
    public function show(Request $request, $id) {
        return view('testing.testing');
    }
}
