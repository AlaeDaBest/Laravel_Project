<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Fragrance;

class Brand extends Model
{
    use HasFactory;
    public function fragrances()
    {
        return $this->hasMany(Fragrance::class);
    }
}
