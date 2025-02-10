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
// Route::post('/addFragrance',[FragranceController::class,'store']);
use App\Http\Controllers\BrandController;
Route::resource('/brands', BrandController::class);
