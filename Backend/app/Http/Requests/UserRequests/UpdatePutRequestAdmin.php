<?php

namespace App\Http\Requests\UserRequests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePutRequestAdmin extends FormRequest
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
            'id' => ['required','exists:user,id'],
            'name' => ['string','min:3', 'max:255'],
            'surname' => ['string','min:3', 'max:255'],
            'email' => ['string','min:6', 'max:600', 'unique:App\Models\User'],
            'password' => ['string','min:8', 'max:600'],
            'age' => ['max:600'],
            'phone' => ['min:8', 'max:600'],
            'address' => ['string','min:8', 'max:600'],
        ];
    }
}
