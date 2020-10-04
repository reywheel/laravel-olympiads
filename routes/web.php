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
    Route::get('/users/all', 'UsersController@showAll')->name('users.all');
});
Auth::routes();

Route::get('ajax/users/all', 'AjaxController@showAllUsers')->name('ajax.users.all');

