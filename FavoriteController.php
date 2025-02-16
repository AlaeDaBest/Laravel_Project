<?php

namespace App\Http\Controllers;
use App\Models\Brand;
use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $favorites=Auth::user()->favorites()->with('fragrance')->get();
        return response()->json($favorites);
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
        $validated = $request->validate([
            'fragrance_id' => 'required|exists:fragrances,id',
        ]);

        $favorite = Auth::user()->favorites()->create([
            'fragrance_id' => $validated['fragrance_id'],
        ]);

        return response()->json(['message' => 'Fragrance added to favorites', 'favorite' => $favorite], 201);
    


    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $favorite = Auth::user()->favorites()->where('fragrance_id', $id)->firstOrFail();
        $favorite->delete();

        return response()->json(['message' => 'Removed from favorites']);
    }
}
