<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Srmklive\PayPal\Facades\PayPal;


//use Srmklive\PayPal\Services\PayPal;



class PayPalController extends Controller
{
    public function create(Request $request){
        $data = json_decode($request->getContent(), true);

        $provider = PayPal::setProvider();
        $provider->setApiCredentials(config('paypal'));
        $token = $provider->getAcsessToken();
        $provider->setAcsessToken($token);

        $price = 5;
        $description = 'TestDescription';

        $order = $provider->createOrder([
            "intent" => "CAPTURE",
            "purchase_units" => [
                [
                    "amount" => [
                        "currency_code" => "USD",
                        "value" => $price
                    ],
                    "description" => $description
                ]
            ]
        ]);

        return response()->json($order);
    }
    public function capture(Request $request){
        $data = json_decode($request->getContent(), true);
        $orderId = $data['orderId'];

        $provider = PayPal::setProvider();
        $provider->setApiCredentials(config('paypal'));
        $token = $provider->getAcsessToken();
        $provider->setAcsessToken($token);

        $result = $provider->capturePaymentOrder($orderId);

        return response()->json($result);
    }
}
