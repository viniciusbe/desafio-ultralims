<?php

use App\Http\Controllers\AddressController;
use Illuminate\Support\Facades\Route;

Route::get('/', [AddressController::class, 'index']);
