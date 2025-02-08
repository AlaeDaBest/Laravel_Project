import React, { useEffect, useState } from "react";
import Fragrance from "./Fragrance";
import Header from "./Header";
import axios from "axios";
const ListFragrances=()=>{
    const [fragrances,setFragrances]=useState([]);
    const[brands,setBrands]=useState([]);
    // Fetching the fragrances <-- list d fragrances
    useEffect(()=>{
        axios.get('/fragrances')
        .then(response=>{
            console.log(response)
            setFragrances(response.data);
        })
        .catch(error=>console.log('There was an error fetching fragrances',error))
    },[]);
    // Fetching brands <-- select d brands
    useEffect(()=>{
        axios.get('/brands')
        .then(response=>{
            console.log(response);
            setBrands(response.data);
        })
        .catch(error=>console.log('There was an error fetching the brands:',error))
    },[])
    // console.log(brands);
    // console.log(fragrances);
    const [searchedTearm,setSearchedTerm]=useState('');
    const [selectedSex,setSelectedSex]=useState('');
    const [selectedBrand,setSelectedBrand]=useState('');
    const [sortedType,setSortedType]=useState('');
    let filteredFragrances=fragrances.filter((item)=>((selectedSex?item.sex==selectedSex:true)&&(selectedBrand?item.brand_id==selectedBrand:true)&&(searchedTearm?item.name.toLowerCase().includes(searchedTearm.toLowerCase()):true)));
    var getSortedFragrances=()=>{
        let sortedResult=filteredFragrances;
        if(sortedType=='Asc'){
            sortedResult=sortedResult.sort((a,b) => new Date(a.release_date) -new Date(b.release_date))
        }else{
            sortedResult=sortedResult.sort((a,b) => new Date(b.release_date) -new Date(a.release_date))
        }
        return sortedResult;
    }
    const sortedFragrances=getSortedFragrances();
    return(
        <div>
            <Header/>           
            <section className="SelectBar">
                <div>
                    <label htmlFor="">Select Sex : </label>
                    <select onChange={(e)=>setSelectedSex(e.target.value)}>
                        <option value="">All</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Unisex">Unisex</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="">Select Brand : </label>
                    <select name="" id="" onChange={(e)=>setSelectedBrand(e.target.value)}>
                        <option value="">All </option>
                        {brands.map(brand=>(
                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="">Sort :</label>
                    <select name="" id="" onChange={(e)=>setSortedType(e.target.value)}>
                        <option value="Desc">Newest to Oldest</option>
                        <option value="Asc">Oldest to Newest</option>
                    </select>
                </div>
            </section>
            <section id="CardGlobal">
                {sortedFragrances.map((fragrance,i)=>(
                    <Fragrance key={i} fragrance={fragrance} setFragrances={setFragrances} fragrances={fragrances} />
                ))}
            </section>
        </div>
    )
}
export default ListFragrances;