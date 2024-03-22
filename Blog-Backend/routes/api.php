<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\UserController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::Post('register',[UserController::class,'register']);
Route::Post('login',[UserController::class,'login']);
Route::Post('blog',[BlogController::class,'blog']);
Route::Get('list',[BlogController::class,'list']);
Route::delete('delete/{id}',[BlogController::class,'delete']);
Route::get('blog/{id}',[BlogController::class,'getBlog']);
Route::put('UpdateBlog/{id}',[BlogController::class,'updateBlog']);
Route::get('search/{key}',[BlogController::class,'search']);




