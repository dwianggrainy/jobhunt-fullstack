<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ApplicationController;

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout',[AuthController::class, 'logout']);
    });
});

Route::middleware(['auth:sanctum', 'role:recruiter'])->group(function () {
    Route::post('/jobs', [JobController::class, 'store']);
    Route::get('/jobs/mine', [JobController::class, 'mine']);
    Route::put('/jobs/{id}', [JobController::class, 'update']);
    Route::delete('/jobs/{id}', [JobController::class, 'destroy']);
});

Route::get('/jobs', [JobController::class, 'index']);
Route::get('/jobs/{id}', [JobController::class, 'show']);

Route::middleware(['auth:sanctum', 'role:job_seeker'])->group(function () {
    Route::post('/jobs/{id}/apply', [ApplicationController::class, 'apply']);
});
