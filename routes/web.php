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

    Route::prefix('/users')->middleware('role:admin')->group(function () {
        Route::get('/', 'UsersController@showAll')->name('users.read');
        Route::get('/{id}/delete', 'UsersController@delete')->where('id', '[0-9]+')->name('users.delete');
        Route::get('/{id}/update', 'UsersController@updateGet')->where('id', '[0-9]+')->name('users.update-get');
        Route::post('/update', 'UsersController@updatePost')->name('users.update-post');
        Route::get('/create', 'UsersController@createGet')->name('users.create-get');
        Route::post('/create', 'UsersController@createPost')->name('users.create-post');
    });

    Route::prefix('/tests')->group(function() {
        Route::get('/', 'TestsController@showAll')->name('tests.show-all');
        Route::get('/{id}', 'TestsController@showById')
            ->where('id', '[0-9]+')
            ->name('tests.show-by-id');
        Route::get('/create', 'TestsController@createGet')
            ->middleware('role:admin')
            ->name('tests.create-get');
        Route::post('/create', 'TestsController@createPost')
            ->middleware('role:admin')
            ->name('tests.create-post');
        Route::get('/{id}/update', 'TestsController@updateGet')
            ->middleware('role:admin')
            ->where('id', '[0-9]+')
            ->name('tests.update-get');
        Route::post('/update', 'TestsController@updatePost')
            ->middleware('role:admin')
            ->name('tests.update-post');
        Route::get('/{id}/delete', 'TestsController@delete')
            ->middleware('role:admin')
            ->where('id', '[0-9]+')
            ->name('tests.delete');
        Route::get('/{id}/results', 'TestsController@showResults')
            ->middleware('role:admin:moderator')
            ->where('id', '[0-9]+')
            ->name('tests.results');
        Route::get('/{test_id}/results/{user_id}', 'TestsController@showUserResults')
            ->middleware('role:admin:moderator')
            ->where('test_id', '[0-9]+')
            ->where('user_id', '[0-9]+')
            ->name('tests.user_results');

    });

    Route::prefix('/testing')->group(function() {
        Route::get('/{id}', 'TestingController@show')->where('id', '[0-9]+')->name('testing.show');
        Route::get('/{id}/complete', 'TestingController@completeGet')->where('id', '[0-9]+')->name('testing.complete-get');
        Route::post('/{id}/complete', 'TestingController@completePost')->where('id', '[0-9]+')->name('testing.complete-post');
    });
});

Auth::routes();

Route::get('ajax/users/all', 'AjaxController@showAllUsers')->name('ajax.users.all');

// TODO: 
// Редактирование профиля
// Редактирование тестов
// Добавление вопроса с одним вариантов выбора
// Забыли пароль?
// Добавить админу возможность менять роли пользователей
// Русификация ошибок при валидации
// Переместить валидацию из контроллеров