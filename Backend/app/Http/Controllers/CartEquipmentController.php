<?php

namespace App\Http\Controllers;

use App\Http\Requests\CartRequests\CreatePostRequest;
use App\Models\CartModel;
use App\Models\CartEquipmentModel;
use App\Models\EquipmentModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CartEquipmentController extends Controller
{
    public function MakeOrderToCart($cid, $date_start, $date_end, $duration, $eid){
        $price = EquipmentModel::find($eid)
            ->where('eid', $eid)
            ->first('price');
//        return $price;
            $cart = CartEquipmentModel::create([
            'eid' => $eid,
            'cid' => $cid,
            'date_start' => $date_start,
            'date_end' => $date_end,
            'duration' => $duration,
            'price' => ((int)$price->price * $duration),
        ]);
        return response([$cart], Response::HTTP_OK);
    }
}
