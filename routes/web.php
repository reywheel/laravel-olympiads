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
    Route::redirect('/', '/tests')->name('home');

    Route::resource('users', 'UserController', ['except' => ['show']])->middleware('role:admin');
    Route::resource('tests', 'TestController');

    Route::prefix('/tests')->group(function() {
        // Route::get('/', 'TestsController@showAll')->name('tests.show-all');
        // Route::get('/{test_id}', 'TestsController@showById')->name('tests.show-by-id');
        // Route::get('/create', 'TestsController@createGet')
        //     ->middleware('role:admin')
        //     ->name('tests.create-get');
        // Route::post('/create', 'TestsController@createPost')
        //     ->middleware('role:admin')
        //     ->name('tests.create-post');
        // Route::get('/{test_id}/update', 'TestsController@updateGet')
        //     ->middleware('role:admin')
        //     ->name('tests.update-get');
        // Route::post('/update', 'TestsController@updatePost')
        //     ->middleware('role:admin')
        //     ->name('tests.update-post');
        // Route::get('/{test_id}/delete', 'TestsController@delete')
        //     ->middleware('role:admin')
        //     ->name('tests.delete');

        Route::get('/{test_id}/results', 'TestsController@showResults')
            ->middleware('role:admin:moderator')
            ->name('tests.results');
        Route::get('/{test_id}/results/{user_id}', 'TestsController@showUserResults')
            ->middleware('role:admin:moderator')
            ->name('tests.user_results');

    });

    Route::prefix('/testing')->group(function() {
        Route::get('/{test_id}', 'TestingController@show')->name('testing.show');
        Route::get('/{test_id}/complete', 'TestingController@completeGet')->name('testing.complete-get');
        Route::post('/{test_id}/complete', 'TestingController@completePost')->name('testing.complete-post');
    });
});

Auth::routes();

// TODO: 
// Редактирование профиля
// Редактирование тестов
// Добавление вопроса с одним вариантов выбора
// Забыли пароль?
// Назначение роли пользователя при добавлении через админку
// Разобраться с route:list
// Подтверждение удаления чего-либо
// Поменять в контроллерах аргументы с id на test_id, user_id и т.д.