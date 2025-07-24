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

Route::apiResource('destinations', DestinationController::class);//radi
Route::apiResource('attractions', AttractionController::class);//radi
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);//radi
    Route::apiResource('trip-plans', TripPlanController::class);//radi
//    Route::apiResource('destinations', DestinationController::class);//radi
//    Route::apiResource('attractions', AttractionController::class);//radi
});
//mislim GET /destinations = public
//
//POST/PUT/DELETE /destinations = zaštićeno → ako želiš da samo admin menja, onda ih stavi pod auth:sanctum.
//Ako su atrakcije javne (svi mogu videti) → nema auth na GET
//
//Ako želiš da samo ulogovani korisnici dodaju/menjaju atrakcije → POST/PUT/DELETE stavi pod auth u Laravelu.
