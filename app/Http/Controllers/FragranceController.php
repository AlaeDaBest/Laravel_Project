<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Fragrance;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\Rule;
use App\Models\Import\ImportFragrance;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Controllers\Controller;
use App\Exports\FragrancesExport;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

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
            // Handling the image ಥ_ಥ
            
            $image=$request->file('image');
            // dd($image);
            $imageName=$request->input('name').time() .'.'.strtolower($image->getClientOriginalExtension());
            $publicPath = public_path('Images/Fragrances'); 
            $imagePath ='Images/Fragrances/'.$imageName;     
            $image->move($publicPath, $imageName);
            $fragrance=new Fragrance();
            $fragrance->name=$request->input('name');
            $fragrance->release_date=$request->input('release_date');
            $fragrance->brand_id=$request->brand_id;
            $fragrance->genre=$request->input('genre');
            $fragrance->price=$request->input('price');
            $fragrance->sex=$request->input('sex');
            $fragrance->volume_ml=$request->input('volume_ml');
            $fragrance->stock= (int)$request->input('stock');
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
        $fragrance=Fragrance::findOrFail($id);
        return $fragrance;
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


        // dd($request->all());
        // $validator=Validator::make($request->all(),[
        //     'name'=>'string',
        //     'brand_id'=>'exists:brands,id',
        //     'release_date'=>'date',
        //     'sex'=>'string',
        //     'price'=>'numeric',
        //     'genre'=>'string'
        // ]);
        // if($validator->fails()){
        //     return response()->json(['errors'=>$validator->errors()],422);
        // }
        try{
            $fragrance=Fragrance::findOrFail($id);
            $fragrance->name=$request->name;
            $fragrance->brand_id=$request->brand_id;
            $fragrance->release_date=$request->release_date;
            $fragrance->genre=$request->genre;
            $fragrance->sex=$request->sex;
            $fragrance->price=$request->price;
            $fragrance->volume_ml=$request->volume_ml;
            // dd($request->image);
            // if($request->image!==null){
                 // dd($fragrance->image);
            //     if($fragrance->image){
            //         dd($fragrance->image);
            //         $images = $request->image;
            //         $imageName = time() . '.' . $image->getClientOriginalExtension();
            //         if($fragrance->image){
            //             $oldImagePath=public_path($fragrance->image);
            //             if(File::exists($oldImagePath)){
            //                 File::delete($oldImagePath);
            //             }
            //         }
            //         $image->move(public_path('Images/Fragrances'),$imageName);
            //         $fragrance->image='Images/Fragrances'.$imageName;
            //     }
            //     return response()->json(['fragrance'=>fragrance],200);
            // }
            // dd($fragrance);
            $fragrance->save();
            return response()->json(['fragrance'=>$fragrance],200);
        }catch(error){
            return response()->json(['error' => 'Failed to update fragrance. ' . $e->getMessage()], 500); 
        }
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
    public function import(Request $request)
    {
        $request->validate([
            'file'=>'required|mimes:csv,txt,xlsx'
        ]);
        Excel::import(new ImportFragrance, $request->file('file'));
        return back()->with('success', 'Products imported successfully.');
    }
    public function export(Request $request)
    {
        return Excel::download(new FragrancesExport, 'fragrances.xlsx'); 
    }
}
