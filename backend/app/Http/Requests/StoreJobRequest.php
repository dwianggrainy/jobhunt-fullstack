<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreJobRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' =>['required','string','max:200'],
            'company' =>['required','string','max:150'],
            'location' =>['required','string','max:150'],
            'type' =>['required','in:full-time,part-time,contract,internship'],
            'description' =>['required','string'],
            'requirements' =>['string','nullable'],
            'salary_min' =>['nullable','integer'],
            'salary_max' =>['nullable','integer'],
            'is_active' =>['boolean'],
        ];
    }
}
