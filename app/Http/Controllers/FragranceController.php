<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Fragrance;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;

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
        // dd($request->all());
        $validator=Validator::make($request->all(),[
            'name'=>'required|string|max:255',
            'release_date'=>'required|date',
            'brand_id'=>'required|string|exists:brands,id',
            'genre'=>'required|string|max:255',
            'price'=>'required|numeric',
            'sex'=>'required|string',
            'image'=>'required|image',
            'volume_ml'=>'required|numeric',
            'stock'=>'required|numeric'
        ]);
        if($validator->fails()){
            return response()->json(['message'=>$validator->errors()],400);
        }
        try{
            // $imagePath='aa';
            // if($request->hasFile('image')){
            

            // $publicPath = public_path('Fragrances');
            $image=$request->file('image');
            $imageName=$request->input('name').time() .'.'.strtolower($image->getClientOriginalExtension());

            $publicPath = public_path('Images/Fragrances'); // Store directly in public
            $imagePath ='Images/Fragrances/'.$imageName;       // Relative to public
            $image->move($publicPath, $imageName);
            // $imagePath=$image->storeAs('Images/Fragrances',$imageName,'public');
            // $image->move($publicPath, $imageName);
            // if(!$imagePath){
            //     return response()->json(['message' => 'Error saving image'], 500);
            // }
            $fragrance=new Fragrance();
            $fragrance->name=$request->input('name');
            $fragrance->release_date=$request->input('release_date');
            $fragrance->brand_id=$request->brand_id;
            $fragrance->genre=$request->input('genre');
            $fragrance->price=$request->input('price');
            $fragrance->sex=$request->input('sex');
            $fragrance->volume_ml=$request->input('volume_ml');
            $fragrance->stock= (int)$request->input('stock');
            // $fragrance->image='Images/Fragrances'.$imageName;
            $fragrance->image=$imagePath;
            $fragrance->save();
            return response()->json(['message' => 'Fragrance added successfully'], 200);
        }catch(\Exception $e){
            dd($e);
            return response()->json(['message' => 'Error adding fragrance: ' . $e->getMessage()], 500);
        }
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
