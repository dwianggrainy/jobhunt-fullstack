<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;


class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $validatedData = $request->validated();
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' =>$validatedData['password'],
            'role'=>$validatedData['role'],
        ]);
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        $validatedData = $request->validated();
        $user = User::where('email',$validatedData['email'])->first();
        if(!$user){
            return response()->json([
                'message'=>'email atau password salah'
            ],401);
        }
        if (!Hash::check($validatedData['password'],$user->password))
            {
                return response()->json([
                    'message' => 'email atau password salah'
                ], 401);
            }

        $token= $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'user'=>$user,
            'token'=>$token
        ],200);

    }

    public function me(Request $request)
    {
        return response()->json([
            'user'=> $request->user()
        ],200);

    }
}
