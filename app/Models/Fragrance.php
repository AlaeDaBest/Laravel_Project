<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Brand;
use App\Models\OrderItem;
use App\Models\Customer;

class Fragrance extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'brand_id',
        'release_date',
        'genre',
        'sex',
        'image', 
        'price',
        'volume_ml',
        'stock',
    ];
    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }
    public function orderItems()
    {
        return $this->hasMany(OrderItem);
    }
    public function favorites()
    {
        return $this->belongsToMany(Customer::class,'favorites');
    }
    public function cart()
    {
        return $this->belongsToMany(Customer::class,'cart');
    }
}
