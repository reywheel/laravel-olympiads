<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::group(['middleware' => 'auth'], function() {
    Route::get('/', 'HomeController@index')->name('home');

    Route::prefix('/users')->group(function () {
        Route::get('/', 'UsersController@showAll')->name('users.read');
        Route::get('/{id}/delete', 'UsersController@delete')->where('id', '[0-9]+')->name('users.delete');
        Route::get('/{id}/update', 'UsersController@updateGet')->where('id', '[0-9]+')->name('users.update-get');
        Route::post('/update', 'UsersController@updatePost')->name('users.update-post');
        Route::get('/create', 'UsersController@createGet')->name('users.create-get');
        Route::post('/create', 'UsersController@createPost')->name('users.create-post');
    });

    Route::prefix('/tests')->group(function() {
        Route::get('/', 'TestsController@showAll')->name('tests.show-all');
        Route::get('/{id}', 'TestsController@showById')->where('id', '[0-9]+')->name('tests.show-by-id');
        Route::get('/create', 'TestsController@createGet')->name('tests.create-get');
        Route::post('/create', 'TestsController@createPost')->name('tests.create-post');
        Route::get('/{id}/update', 'TestsController@updateGet')->where('id', '[0-9]+')->name('tests.update-get');
        Route::post('/update', 'TestsController@updatePost')->name('tests.update-post');
        Route::get('/{id}/delete', 'TestsController@delete')->where('id', '[0-9]+')->name('tests.delete');

    });

    Route::prefix('/tests/{id}/questions')->where(['id' => '[0-9]+'])->group(function() {
       Route::get('/create', 'QuestionsController@createGet')->name('questions.create-get');
       Route::post('/create', 'QuestionsController@createPost')->name('questions.create-post');
    });
});

Auth::routes();

Route::get('ajax/users/all', 'AjaxController@showAllUsers')->name('ajax.users.all');

