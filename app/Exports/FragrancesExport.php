<?php

namespace App\Exports;

use App\Models\Fragrance;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromModel;
use Maatwebsite\Excel\Concerns\WithHeadings; 

class FragrancesExport implements FromCollection,WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Fragrance::all();
    }
    public function headings(): array
    {
        return [
            'ID',
            'Name',
            'Brand ID',  
            'Release Date',
            'Genre',
            'Sex',
            'Image',
            'Price',
            'Volume (ml)',
            'Stock',
        ];
    }
}
