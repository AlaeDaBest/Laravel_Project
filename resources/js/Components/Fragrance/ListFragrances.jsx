import React, { useEffect, useState } from "react";
import Fragrance from "./Fragrance";
import Header from "./Header";
import axios from "axios";
const ListFragrances=()=>{
    const [fragrances,setFragrances]=useState([]);
    // console.log(fragrances)
    useEffect(()=>{
        axios.get('/fragrances')
        .then(response=>{
            console.log(response)
            setFragrances(response.data);
        })
        .catch(error=>console.log('There was an error fetching fragrances',error))
    },[]);
    console.log(fragrances)
    const [searchedTearm,setSearchedTerm]=useState('');
    const [selectedSex,setSelectedSex]=useState('');
    const [selectedBrand,setSelectedBrand]=useState('');
    const [sortedType,setSortedType]=useState('');
    let filteredFragrances=fragrances.filter((item)=>((selectedSex?item.sex==selectedSex:true)&&(selectedBrand?item.brand==selectedBrand:true)&&(searchedTearm?item.name.toLowerCase().includes(searchedTearm.toLowerCase()):true)));
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
                    <select onChange={(e)=>setSelectedBrand(e.target.value)}>
                        <option value="">All Brands</option>
                        <option value="Chanel">Chanel</option>
                        <option value="Dior">Dior</option>
                        <option value="Yves Saint Laurent">Yves Saint Laurent</option>
                        <option value="Giorgio Armani">Giorgio Armani</option>
                        <option value="Viktor & Rolf">Viktor & Rolf</option>
                        <option value="Thierry Mugler">Thierry Mugler</option>
                        <option value="Dolce & Gabbana">Dolce & Gabbana</option>
                        <option value="Lancome">Lancome</option>
                        <option value="Gucci">Gucci</option>
                        <option value="Paco Rabanne">Paco Rabanne</option>
                        <option value="Versace">Versace</option>
                        <option value="Tom Ford">Tom Ford</option>
                        <option value="Carolina Herrera">Carolina Herrera</option>
                        <option value="Jean Paul Gaultier">Jean Paul Gaultier</option>
                        <option value="Narciso Rodriguez">Narciso Rodriguez</option>
                        <option value="Jo Malone">Jo Malone</option>
                        <option value="Hermès">Hermès</option>
                        <option value="Creed">Creed</option>
                        <option value="Guerlain">Guerlain</option>
                        <option value="Maison Francis Kurkdjian">Maison Francis Kurkdjian</option>
                        <option value="Le Labo">Le Labo</option>
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
                {fragrances.map((fragrance,i)=>(
                    <Fragrance key={i} fragrance={fragrance} />
                ))}
            </section>
        </div>
    )
}
export default ListFragrances;