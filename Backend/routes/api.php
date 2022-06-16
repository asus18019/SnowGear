<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('register', [\App\Http\Controllers\AuthController::class, 'register']);
Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);
Route::post('/logout', [\App\Http\Controllers\AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [\App\Http\Controllers\AuthController::class, 'user']);
});

Route::group(['middleware' => ['auth:sanctum', 'role:moderator|admin']], function () {
    Route::prefix('user')->group(function () {
        Route::delete('delete', [\App\Http\Controllers\UserController::class, 'userDelete']);
        Route::put('update', [\App\Http\Controllers\UserController::class, 'userUpdateForAdmins']);
        Route::get('users', [\App\Http\Controllers\UserController::class, 'getUsers']);
    });
    Route::prefix('equipment')->group(function () {
        Route::get('/equipment', [\App\Http\Controllers\EquipmentController::class, 'getEquipment']);
        Route::put('/update', [\App\Http\Controllers\EquipmentController::class, 'updateEquipment']);
        Route::post('/create', [\App\Http\Controllers\EquipmentController::class, 'createEquipment']);
        Route::post('/delete', [\App\Http\Controllers\EquipmentController::class, 'deleteEquipment']);
        Route::get('/equipmentbyid', [\App\Http\Controllers\EquipmentController::class, 'getEquipmentById']);
    });
    Route::prefix('cart')->group(function () {
        Route::get('/userorders', [\App\Http\Controllers\CartController::class, 'userOrders']);
        Route::get('/getcartbyid', [\App\Http\Controllers\CartController::class, 'getCartById']);
        Route::put('/updatecart', [\App\Http\Controllers\CartController::class, 'updateCart']);
    });
});

Route::group(['middleware' => ['auth:sanctum', 'role:user|moderator|admin']], function () {
    Route::prefix('user')->group(function () {
        Route::put('/updateuser', [\App\Http\Controllers\UserController::class, 'userUpdate']);
        Route::get('/userorders', [\App\Http\Controllers\CartEquipmentController::class, 'userOrders']);
    });

    Route::prefix('cart')->group(function () {
        Route::post('/cart', [\App\Http\Controllers\CartController::class, 'AddToCart']);
    });
});

Route::namespace('App\Http\Controllers')->group(function () {

    Route::post('paypal/order/create','PaypalController@create');
    Route::post('paypal/{orderId}/capture','PaypalController@capture');

});

