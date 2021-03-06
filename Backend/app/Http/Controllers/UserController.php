<?php

namespace App\Http\Controllers;

use App\Http\Requests\EquipmentRequests\CreatePostRequest;
use App\Http\Requests\UserRequests\DeleteRequest;
use App\Http\Requests\UserRequests\UpdatePutRequest;
use App\Http\Requests\UserRequests\UpdatePutRequestAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    public function userUpdate(UpdatePutRequest $request)
    {
        if(!$request->input()){
            return response(['messages' => 'empty data'], Response::HTTP_BAD_REQUEST);
        }
        $user = Auth::user();
        $user->update($request->except('password'));
        if($request->input('password')){
            $user->password = Hash::make($request->input('password'));
            $user->save();
        }
        return response(['messages' => 'success', 'updater user' => $user, $user->password], Response::HTTP_OK);
    }


    public function userUpdateForAdmins(UpdatePutRequestAdmin $request){
        $user = User::find($request->id);
        $user->update($request->except('password'));
        if($request->query('password')){
            $user->password = Hash::make($request->query('password'));
            $user->save();
        }
        return response(['messages' => 'success', 'updated_user' => $user, $user->password], Response::HTTP_OK);
    }


    public function userDelete(DeleteRequest $request) {
        $user = User::find($request->userID);
        $user->delete();
        return response(['messages' => 'success'], Response::HTTP_OK);
    }
    public function getUsers(){
        $user =  USER::all();
        return response($user, Response::HTTP_OK);
    }
}
