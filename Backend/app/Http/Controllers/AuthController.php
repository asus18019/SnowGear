<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequests\RegisterPostReq;
use App\Models\User;
use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterPostReq $request){
        $user = User::create([
            'name' => $request->input('name'),
            'surname' => $request->input('surname'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'age' => $request->input('age'),
            'phone' => $request->input('phone'),
            'address' => $request->input('address'),
            'bid' => $request->input('bid'),
            'reid' => $request->input('reid'),
        ]);
//        $user->assignRole('user');
        return $user;
    }

    public function login(Request $request){
        if(!Auth::attempt($request->only('email','password'))){
            return response([
                'message' => 'invalid credentials',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $user = Auth::user();

        $token = $user->createToken('token')->plainTextToken;

        $cookie = cookie('jwt', $token, 60*24, '/', '', false, true, '', 'none');

        return response([
            'messages' => 'Success',
            'token' => $token,
        ])->withCookie($cookie);
    }

    public function user(){
        return Auth::user();
    }

    public function logout(Request $request)
    {
        $cookie = Cookie::forget('jwt');

        return response([
            'message' => 'Success'
        ])->withCookie($cookie);
    }
}
