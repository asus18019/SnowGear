<?php

namespace App\Http\Requests\EquipmentRequests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePutRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'eid' => ['required', 'exists:equipment,eid'],
            'location' => ['string','min:8', 'max:255'],
            'size' => ['string','min:1', 'max:255'],
            'title' => ['string','min:3', 'max:255'],
            'category' => [ 'string','min:3', 'max:255'],
        ];
    }
}
