<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator=Validator::make($request->all(),[
            'first_name'=>'required|string|max:255',
            'last_name'=>'required|string|max:255',
            'email'=>'required|string|unique:users',
            'password'=>'required|string|min:8',
            'adress' => 'nullable|string', 
            'phone' => 'nullable|string',
        ]);
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $user=User::create([
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
            'first_name'=>$request->first_name,
            'last_name'=>$request->last_name,
            'adress'=> $request->last_name,
            'phone'=>$request->phone,
            'role'=>'customer'
        ]);
        $token = $user->createToken('auth-token')->plainTextToken;
        return response()->json(['token' => $token, 'user' => $user], 201);
    }
    public function login(Request $request)
    {
        $credentials=$request->validate([
            'email'=>'required|email',
            'password'=>'required'
        ]);
        if(Auth::attempt($credentials)){
            $request->session()->regenerate();
            $user=Auth::user();
            return response()->json(['user' => $user]);
        }
        return response()->json(['message' => 'Invalid credentials'], 401);
    }
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken(); 

        return response()->json(['message' => 'Logged out']);
    }
    public function getUser(Request $request)
    {
        return $request->user(); 
    }
}
