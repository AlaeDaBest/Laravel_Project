<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('app');
});
use App\Http\Controllers\FragranceController;
Route::resource('/fragrances', FragranceController::class);

use App\Http\Controllers\BrandController;
Route::resource('/brands', BrandController::class);

use App\Http\Controllers\CartController;
Route::resource('/cart', CartController::class);

use App\Http\Controllers\FavoriteController;
Route::resource('/favorites', FavoriteController::class);

// Route d registration 
use App\Http\Controllers\AuthController;
Route::post('/register', [AuthController::class, 'register']);
// Route d login 
Route::post('/login', [AuthController::class, 'login']);
// Route d logout
Route::post('/logout', [AuthController::class, 'logout']);

Route::get('/profile', [AuthController::class, 'getUser'])->middleware('auth:sanctum'); 
Route::put('/editFragrance/{id}',[FragranceController::class,'update']);
// Import o Export 
Route::post('/import', [FragranceController::class, 'import']);
Route::get('/export', [FragranceController::class, 'export']);
