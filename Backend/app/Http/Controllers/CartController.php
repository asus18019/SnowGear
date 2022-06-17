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
    public function userOrders(Request $request){
        $result = CartModel::where('cart.id', $request->id)
            ->leftJoin('cart_eq','cart.cid','=','cart_eq.cid')
            ->leftJoin('equipment','cart_eq.eid','=','equipment.eid')
            ->select('cart.id','cart.cid','cart_eq.date_start','cart_eq.date_end','equipment.eid', 'equipment.price','equipment.title','equipment.category')
                ->get();
        return response($result, Response::HTTP_OK);
    }
    public function getCartById(Request $request){
        $result = CartModel::where('cart.cid',$request->cid)
            ->leftJoin('cart_eq','cart.cid','=','cart_eq.cid')
            ->leftJoin('equipment','cart_eq.eid','=','equipment.eid')
            ->leftJoin('user','user.id','=','cart.id')
            ->select('cart.cid','cart.status','cart_eq.date_start','cart_eq.date_end','cart_eq.price','cart_eq.duration','equipment.title','equipment.eid', 'user.name','user.surname' )
            ->get();
        return response( $result, Response::HTTP_OK);
    }
    public function updateCart(Request $request){
        $cart = CartModel::find($request->cid);
        if(!$cart){
            return response(['error' => 'Cart doesnt exist'], Response::HTTP_EXPECTATION_FAILED);
        }
        $cart->update($request->all());
        return response(['updated_cart' => $cart], Response::HTTP_OK);
    }
}
