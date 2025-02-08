<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Fragrance;

class FragranceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $f=Fragrance::all();
            $fragrances=Fragrance::with('brand')->get();
            $fragrancesFormatted=$fragrances->map(function ($fragrance){
                return [
                    'id' => $fragrance->id,
                    'name' => $fragrance->name,
                    'release_date' => $fragrance->release_date,
                    'price' => $fragrance->price,
                    'volume_ml' => $fragrance->volume_ml,
                    'image' => $fragrance->image,
                    'genre' => $fragrance->genre,
                    'sex' => $fragrance->sex,
                    'stock' => $fragrance->stock,
                    'brand' => $fragrance->brand ? [ // Conditional creation of the brand array
                        'id' => $fragrance->brand->id,
                        'name' => $fragrance->brand->name,
                    ] : null,
                    // ... other fragrance attributes
                ];
            });
            // dd($fragrancesFormatted);
            return $fragrancesFormatted;
            // return$f;
            // return  response()->json($fragrancesFormatted, 200);
        } catch (\Exception $e) {
            // Log::error($e);
            return response()->json(['error' => 'Failed to fetch fragrances'], 500); // Return a 500 error
        }
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
        $fragrance=Fragrance::findOrFail($id);
        $fragrance->delete();
        return response()->json(null,204);
    }
}
