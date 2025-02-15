<?php

namespace App\Models\Import;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use App\Models\Fragrance;

class ImportFragrance implements ToModel,WithHeadingRow
{
    use HasFactory;
    public function model(array $row)
    {
        return new Fragrance([
            'name'=>$row['name'],
            'brand_id'=>$row['brand_id'],
            'release_date'=>$row['release_date'],
            'genre'=>$row['genre'],
            'sex'=>$row['sex'],
            'image'=>$row['image']?? null,
            'price'=>$row['price'],
            'volume_ml'=>$row['volume_ml'],
            'stock'=>$row['stock']?? 0
        ]);
    }
}
