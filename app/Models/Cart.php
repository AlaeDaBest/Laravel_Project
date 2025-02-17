<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'fragrance_id', 'quantity'];

    public function fragrance()
    {
        return $this->belongsTo(Fragrance::class);
    }
}
