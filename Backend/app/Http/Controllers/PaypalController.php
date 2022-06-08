<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\AuthController;

class PaypalController extends Controller
{
    public function create()
    {
        return $this->createOrder();
    }
    public function capture($orderId)
    {
        return  $this->capturePayment($orderId);
    }

    private function createOrder() {

        $accessToken = $this->generateAccessToken();
        $url = $this->getBaseUrl()."/v2/checkout/orders";
        $response =Http::withHeaders([
            'Authorization'=>"Bearer $accessToken",
            "Content-Type"=> "application/json",
        ])->withBody(json_encode([
            "intent"=> "CAPTURE",
            "purchase_units"=> [
                [
                    "amount"=> [
                        "currency_code"=> "USD",
                        "value"=> "50.00",
                    ],
                ],
            ],
        ]),'application/json')
            ->post($url);
        $data = $response->json();
        if($response->successful()){
            return response()->json($data, 200);
        }
        return response()->json($data, 500);//error
    }


    private function capturePayment(Request $request) {
        $orderId = $request->input('title');
        $url = $this->getBaseUrl()."/v2/checkout/orders/$orderId/capture";
        $accessToken = $this->generateAccessToken();
        $response =Http::withHeaders([
            'Authorization'=>"Bearer $accessToken",
            "Content-Type"=> "application/json",
        ])->withBody('{}','application/json')
            ->post($url);
        $data = $response->json();
        if($response->successful()){
            // save in database
            return response()->json($data, 200);
        }
        return response()->json($data, 500);//error
    }

    private function generateAccessToken() {
        $auth =base64_encode(env('PAYPAL_CLEINT').":".env('PAYPAL_SECRET'));
        $url=$this->getBaseUrl()."/v1/oauth2/token";
        $response =Http::withHeaders([
            'Authorization'=>"Basic $auth"
        ])->asForm()
            ->post($url,[
                'grant_type'=>'client_credentials'
            ]);
        $data =  $response->json();
        if($response->successful()){
            return $data['access_token'];
        }
        return null;
    }

    private function getBaseUrl(){
        if(env('APP_ENV')=='production')
            return "https://api-m.paypal.com";

        return "https://api-m.sandbox.paypal.com";
    }

}
