<?php

namespace App\Http\Controllers;

use App\Http\Controllers\CartEquipmentController;
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

        foreach($request->data as $item ){

            $obj = json_decode(json_encode($item));
            $date_start = $obj->date_start;
            $date_end = $obj->date_end;
            $duration = $obj->duration;
            $eid = $obj->eid;
            $result = (new CartEquipmentController)->MakeOrderToCart($cart->cid, $date_start, $date_end, $duration, $eid);
        }
        return response([$cart], Response::HTTP_OK);
    }
}
