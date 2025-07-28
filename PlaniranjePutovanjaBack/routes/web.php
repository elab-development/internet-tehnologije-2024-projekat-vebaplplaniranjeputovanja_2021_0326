<?php

use App\Http\Controllers\AttractionController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\TripPlanController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::apiResource('destinations', DestinationController::class);
Route::apiResource('attractions', AttractionController::class);
Route::apiResource('trip-plans', TripPlanController::class);

Route::get('/login', function () {
    return view('auth.login'); // ili neka placeholder stranica
})->name('login');

