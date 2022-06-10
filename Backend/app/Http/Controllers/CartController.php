<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\CartModel;
use App\Models\EquipmentModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;


class CartController extends Controller
{
    public function AddToCart(Request $request){

        $cart = CartModel::create([
            'id' => $request->id,
            'date_order' => date('Y-m-d H:i:s'),
            'status' => 'payed',
        ]);

        foreach($request->equipments as $item ){

            $obj = json_decode(json_encode($item));
            $date_start = $obj->date_start;
            $date_end = $obj->date_end;
            $duration = $obj->duration;
            $eid = $obj->eid;
            $result = (new CartEquipmentController)->MakeOrderToCart($cart->cid, $date_start, $date_end, $duration, $eid);
        }
        return response([$cart], Response::HTTP_OK);
    }

    public function Price($eid){
        $price = EquipmentModel::find($eid)
            ->where('eid', $eid)
            ->first('price');
        return $price;
    }
}
