<?php

namespace App\Http\Controllers;

use App\Http\Requests\EquipmentRequests\CreatePostRequest;
use App\Http\Requests\EquipmentRequests\UpdatePutRequest;
use App\Models\EquipmentModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EquipmentController extends Controller
{
    public function createEquipment(CreatePostRequest $request){
        $equipment = EquipmentModel::create([
            'title' => $request->input('title'),
            'size' => $request->input('size'),
            'description' => $request->input('description'),
            'image' => $request->input('image'),
        ]);
        return response([$equipment], Response::HTTP_OK);
    }

    public function updateEquipment(UpdatePutRequest $request){
        $equipment = EquipmentModel::find($request->eid);
        if(!$equipment){
            return response(['error' => 'Equipment doesnt exist'], Response::HTTP_EXPECTATION_FAILED);// todo change the response code
        }
        $equipment->update($request->all());
        return response(['updated equipment' => $equipment], Response::HTTP_OK);
    }

    public function getEquipment(){
        $equipment = EquipmentModel::all();
        return response(['all_equipment' => $equipment], Response::HTTP_OK);
    }

}
