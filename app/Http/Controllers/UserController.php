<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users=User::all();
        return $users;
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user=User::findOrFail($id);
        return $user;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user=User::findOrFail($id);
        $user->first_name=$request->first_name;
        $user->last_name=$request->last_name;
        $user->email=$request->email;
        $user->phone=$request->phone;
        $user->role=$request->role;
        $user->save();
        return response()->json(['message' => 'User modified successfully'], 200); 
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user=User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User Deleted successfully'], 200); 
    }
}
