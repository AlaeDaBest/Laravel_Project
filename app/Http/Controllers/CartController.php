<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;


class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cartItems = Cart::where('user_id', Auth::id())->with('fragrance')->get();
        return response()->json([
            'message' => 'Liste des articles du panier récupérée avec succès.',
            'data' => $cartItems
        ]);
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
            'quantity' => 'required|integer|min:1',
        ]);
        try {
            $existingItem = Cart::where('user_id', Auth::id())
                                ->where('fragrance_id', $validated['fragrance_id'])
                                ->firstOrFail();
            $existingItem->increment('quantity', $validated['quantity']);
            return response()->json([
                'message' => 'Quantité mise à jour dans le panier.',
                'data' => $existingItem
            ]);
        } catch (\Exception $e) {
            $cartItem = Cart::create([
                'user_id' => Auth::id(),
                'fragrance_id' => $validated['fragrance_id'],
                'quantity' => $validated['quantity'],
            ]);

            return response()->json([
                'message' => 'Article ajouté au panier.',
                'data' => $cartItem
            ], 201);
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
        $cartItem = Cart::where('user_id', Auth::id())->findOrFail($id);
         $cartItem->delete();
         return response()->json([
             'message' => 'Article retiré du panier.'
         ]);
    }
    public function clear()
    {
    Cart::where('user_id', Auth::id())->delete();
    return response()->json([
            'message' => 'Panier vidé avec succès.'
    ]);
    }
}
