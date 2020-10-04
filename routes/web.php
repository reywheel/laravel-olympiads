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
        Route::get('/{id}/delete', 'UsersController@delete')->name('users.delete');
        Route::get('/{id}/update', 'UsersController@updateGet')->name('users.update-get');
        Route::post('/update', 'UsersController@updatePost')->name('users.update-post');
        Route::get('/create', 'UsersController@createGet')->name('users.create-get');
        Route::post('/create', 'UsersController@createPost')->name('users.create-post');
    });
});
Auth::routes();

Route::get('ajax/users/all', 'AjaxController@showAllUsers')->name('ajax.users.all');

