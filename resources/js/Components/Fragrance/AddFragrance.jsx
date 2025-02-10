import React, { useEffect, useRef, useState } from "react";
import Header from "../Home/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddFragrance=()=>{
    const [name,setName]=useState('');
    const [imageUrl,setImageUrl]=useState(null);
    const [release_date,setRelease_Date]=useState('');
    const [genre,setGenre]=useState('');
    const [price,setPrice]=useState('');
    const [sex,setSex]=useState('');
    const [volume_ml,setVolume_ml]=useState('');
    const [stock,setStock]=useState('');
    const fileInputRef=useRef(null);
    const [brands,setBrands]=useState([]);
    const [brand_id,setBrandId]=useState(3);
    const navigate=useNavigate();
    useEffect(()=>{
        axios.get('/brands')
        .then(response=>{
            console.log(response);
            setBrands(response.data);
        })
        .catch(error=>console.log('There was an error fetching brands:',error))
    },[])
    const Add=async(e)=>{
        e.preventDefault();
        const file=fileInputRef.current.files[0];
        if(!file){
            alert('Please select an image');
            return;
        }
        const formData=new FormData();
        console.log(name,release_date,brand_id,genre,price,sex,volume_ml,stock,file);
        formData.append('name',name);
        formData.append('release_date',release_date);
        formData.append('brand_id',brand_id);
        formData.append('genre',genre);
        formData.append('price',price);
        formData.append('sex',sex);
        formData.append('volume_ml',volume_ml);
        formData.append('stock',stock);
        formData.append('image',file);
        try{
            const response=await axios.post('/fragrances',formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            });
            console.log(response.data)
            if(response.status===200){
                console.log('Fragrance added successfuly!');
                fileInputRef.current.value='';
                navigate('/fragrances');
            }else{
                alert(`Error adding fragrance /:${response.data.message || response.statusText}`);
            }
        }catch(error){
            console.error('Error adding fragrance:',error);
        }
    }
    return(
        <div>
            <Header/>
            <section>
                <h1></h1>
                <form onSubmit={Add}>
                    <section>
                        <div>
                            <label htmlFor="">Fragrance Name :</label>
                            <input type="text" onChange={(e)=>setName(e.target.value)} />
                        </div>
                        <div>
                            <input type="file" ref={fileInputRef} />
                        </div>
                    </section>
                    <section>
                        <label htmlFor="">Release Date :</label>
                        <input type="date" onChange={(e)=>setRelease_Date(e.target.value)} />
                    </section>
                    <section>
                        <div>
                            <label htmlFor="">Brand :</label>
                            <select  onChange={(e)=>setBrandId(e.target.value)}>
                                {brands.map(brand=>(
                                    <option value={brand.id} key={brand.id}>{brand.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="">Genre :</label>
                            <select onChange={(e)=>setGenre(e.target.value)}>
                                <option value="Floral">Floral</option>
                                <option value="Woody Aromatic">Woody Aromatic</option>
                                <option value="Oriental Vanilla">Oriental Vanilla</option>
                                <option value="Citrus Aromatic">Citrus Aromatic</option>
                                <option value="Floriental">Floriental</option>
                                <option value="Oriental">Oriental</option>
                                <option value="Citrus Floral">Citrus Floral</option>
                                <option value="Fruity Floral">Fruity Floral</option>
                                <option value="Oriental Spicy">Oriental Spicy</option>
                                <option value="Citrus Spicy">Citrus Spicy</option>
                                <option value="Woody Oriental">Woody Oriental</option>
                                <option value="Woody Spicy">Woody Spicy</option>
                                <option value="Oriental Fougere">Oriental Fougere</option>
                                <option value="Floral Woody Musk">Floral Woody Musk</option>
                                <option value="Spicy">Spicy</option>
                                <option value="Fruity">Fruity</option>
                                <option value="Amber Floral">Amber Floral</option>
                            </select>
                        </div>
                    </section>
                    <section>
                        <div>
                            <label htmlFor="">Price :</label>
                            <input type="text" onChange={(e)=>setPrice(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="">Volume (ml) :</label>
                            <input type="text" onChange={(e)=>setVolume_ml(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="">Stock :</label>
                            <input type="text" onChange={(e)=>setStock(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="">Genre :</label>
                            <input type="radio" name="sex" onClick={(e)=>setSex(e.target.value)} value="Female" /><label htmlFor="">Female </label>
                            <input type="radio" name="sex" onClick={(e)=>setSex(e.target.value)}  value="Male" /><label htmlFor="">Male </label>
                            <input type="radio" name="sex" onClick={(e)=>setSex(e.target.value)}  value="Unisex" /><label htmlFor="">Unisex </label>
                        </div>
                    </section>
                    <input type="submit" value="Add Fragrance" />
                </form>
            </section>
        </div>
    )
}
export default AddFragrance;