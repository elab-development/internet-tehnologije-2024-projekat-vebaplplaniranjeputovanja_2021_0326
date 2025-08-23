<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\AttractionController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\TripPlanController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);//radi
Route::post('/login', [AuthController::class, 'login']);//radi

Route::get('destinations', [DestinationController::class, 'index']);
Route::get('attractions', [AttractionController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);//radi
    Route::apiResource('trip-plans', TripPlanController::class);//radi


    Route::post('destinations', [DestinationController::class, 'store']);
    Route::post('attractions', [AttractionController::class, 'store']);


    Route::delete('/destinations/{id}', [DestinationController::class, 'destroy']);
    Route::delete('attractions', [AttractionController::class, 'destroy']);//radi


});
//mislim GET /destinations = public
//
//POST/PUT/DELETE /destinations = zaštićeno → ako želiš da samo admin menja, onda ih stavi pod auth:sanctum.
//Ako su atrakcije javne (svi mogu videti) → nema auth na GET
//
//Ako želiš da samo ulogovani korisnici dodaju/menjaju atrakcije → POST/PUT/DELETE stavi pod auth u Laravelu.
