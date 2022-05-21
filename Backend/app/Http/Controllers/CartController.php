<?php

namespace App\Http\Controllers;

use App\Http\Requests\CartRequests\CreatePostRequest;
use App\Models\cartModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CartController extends Controller
{
    public function AddToCart(CreatePostRequest $request){
        $cart = CartModel::create([
            'id' => Auth::user()->getAuthIdentifier(),
            'date_order' => date('Y-m-d H:i:s'),
            'status' => 'payed',
        ]);
        return response([$cart], Response::HTTP_OK);
    }
}
