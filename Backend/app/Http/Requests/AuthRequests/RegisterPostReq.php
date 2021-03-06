<?php

namespace App\Http\Requests\AuthRequests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterPostReq extends FormRequest
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
            'name' => ['required', 'string', 'min:3', 'max:255'],
            'surname' => ['required', 'string', 'min:3', 'max:255'],
            'age' => ['required', 'string', 'min:1', 'max:255'],
            'email' => ['required', 'string', 'max:600', 'email' ,'unique:App\Models\User'],
            'password' => ['required', 'min:8'],
            'phone' => ['string', 'min:3', 'max:255'],
            'address' => [ 'string', 'min:3', 'max:255'],
        ];
    }
}
