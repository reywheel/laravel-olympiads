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

    Route::resource('tests', 'TestController');

    Route::prefix('/tests')->group(function() {
        Route::get('/{test_id}/results', 'TestController@showResults')
            ->middleware('role:admin:moderator')
            ->name('tests.results');
        Route::get('/{test_id}/results/{user_id}', 'TestController@showUserResults')
            ->middleware('role:admin:moderator')
            ->name('tests.user_results');
    });

    Route::prefix('/testing')->group(function() {
        Route::get('/{test_id}', 'TestingController@show')->name('testing.show');
        Route::get('/{test_id}/complete', 'TestingController@completeGet')->name('testing.complete-get');
        Route::post('/{test_id}/complete', 'TestingController@completePost')->name('testing.complete-post');
    });

    Route::group(['prefix' => '/admin', 'namespace' => 'Admin', 'middleware' => 'role:admin', 'as' => 'admin/'], function () {
        Route::resource('users', 'UserController', ['except' => ['show']]);
        Route::resource('tests', 'TestController');
    });
});

Auth::routes();

// TODO:
// Редактирование профиля
// Редактирование тестов
// Добавление вопроса с одним вариантов выбора
// Забыли пароль?
// Назначение роли пользователя при добавлении через админку
// Подтверждение удаления чего-либо
// Поменять в контроллерах аргументы с id на test_id, user_id и т.д.
// Перенести админку на новый роут
