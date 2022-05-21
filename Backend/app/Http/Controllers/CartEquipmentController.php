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
    public function MakeOrderToCart(CreatePostRequest $request){
        $price = EquipmentModel::find($request->eid)
            ->get('price');

        $cart = CartEquipmentModel::create([
            'eid' => $request->input('eid'),
            'cid' => $request->input('cid'),
            'date_start' => $request->input('date_start'),
            'date_end' => $request->input('date_end'),
            'duration' => $request->input('duration'),
            'price' => ((int)$price * (int)$request->input('duration')),
        ]);
        return response([$cart], Response::HTTP_OK);
    }
}
