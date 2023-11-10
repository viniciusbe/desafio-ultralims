<?php

use App\Http\Controllers\AddressController;
use Illuminate\Support\Facades\Route;


Route::get('/addresses', [AddressController::class, 'all']);

Route::post('/addresses', [AddressController::class, 'store']);
