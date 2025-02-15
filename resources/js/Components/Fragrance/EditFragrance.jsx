import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 

const EditFragrance = () => {
    const { id } = useParams(); 
    const [release_date,setRelease_Date]=useState();
    const [name,setName]=useState('');
    const [imageUrl,setImageUrl]=useState(null);
    const [genre,setGenre]=useState('Floral');
    const [price,setPrice]=useState('');
    const [sex,setSex]=useState('');
    const [volume_ml,setVolume_ml]=useState('');
    const [stock,setStock]=useState('');
    const [brand_id,setBrandId]=useState(3);
    const [fragrance, setFragrance] = useState(null);
    const [brands,setBrands]=useState([]);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const fileInputRef=useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchFragrance = async () => {
            try {
                const response = await axios.get(`/fragrances/${id}`);
                console.log('dd',response.data)
                setFragrance(response.data);
                console.log(fragrance.name);
                setBrandId(fragrance.brand_id);
                setName(fragrance.name);
                
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching fragrance:", error);
                setIsLoading(false);
            }
        };
        const fetchBrands=async()=>{
            try{
                const response=await axios.get('/brands');
                setBrands(response.data);
                console.log(response.data);
            }catch(error){
                console.error('There was an error fetching the brands',error);
            }
        }
        fetchFragrance();
        fetchBrands();
    }, [id]);
    useEffect(()=>{
        if(fragrance){
            setName(fragrance.name);
            setBrandId(fragrance.brand_id);
            setRelease_Date(fragrance.release_date);
            setPrice(fragrance.price);
            setSex(fragrance.sex);
            setVolume_ml(fragrance.volume_ml);
            setStock(fragrance.stock);
        }
    },[fragrance])
    const handleSubmit = async (e) => {
        console.log(brand_id)
        e.preventDefault();
        setErrors({});
        const file=fileInputRef.current.files[0];
        let data = {
            "name":name,
            "brand_id": brand_id,
            "release_date": release_date,
            "genre": genre,
            "sex": sex,
            "price": price,
            "volume_ml": volume_ml,
            "image":file,
            "stock": stock            
        }
        console.log(file);
        
        try {
            const response = await axios.put(`/fragrances/${id}`, data);
            if (response.status === 200) {
                console.log('Fragrance updated successfully:', response.data.fragrance);
                navigate('/fragrances'); 
            } else {
                console.error('Fragrance update failed:', response.data.message || 'Server error');
                if (response.data.errors) {
                  setErrors(response.data.errors);
                }
            }
        } catch (error) {
            console.error('Fragrance update error:', error);
            if (error.response && error.response.data && error.response.data.errors) {
              setErrors(error.response.data.errors);
            } else if (error.response){
              console.error("Server returned an error:", error.response.status, error.response.data);
            } else if (error.request) {
              console.error("No response received:", error.request);
            } else {
              console.error("Error setting up the request:", error.message);
            }
        }
    };

    if (isLoading) {
        return <p>Loading fragrance data...</p>;
    }

    if (!fragrance) {
        return <p>Fragrance not found.</p>;
    }

    return (
        <div
        style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
        }}
        >
            <div>
            {errors.name && <div className="error">{errors.name[0]}</div>} {/* Display error for name */}
            {errors.brand_id && <div className="error">{errors.brand_id[0]}</div>} 
            {errors.release_date && <div className="error">{errors.release_date[0]}</div>} 
            {errors.genre && <div className="error">{errors.genre[0]}</div>} 
            {errors.sex && <div className="error">{errors.sex[0]}</div>} 
            {errors.price && <div className="error">{errors.price[0]}</div>} 
            {errors.volume_ml && <div className="error">{errors.volume_ml[0]}</div>} 
            {errors.stock && <div className="error">{errors.stock[0]}</div>} 
            </div>
            <h1>Edit</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="" >Brand :</label>
                     <select value={brand_id}  onChange={(e)=>setBrandId(e.target.value)}>
                            {brands.map(brand=>(
                            <option value={brand.id} key={brand.id}>{brand.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="">Release Date :</label>
                    <input type="date" value={release_date} onChange={(e)=>setRelease_Date(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="">Genre :</label>
                    <select value={genre} onChange={(e)=>setGenre(e.target.value)}>
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
                <div>
                <div>
                    <label htmlFor="">Sex :</label>
                    <input type="radio"  name="sex" onClick={(e)=>setSex(e.target.value)} checked={sex=='Female'?true:false} value="Female" /><label htmlFor="">Female </label>
                    <input type="radio" name="sex" onClick={(e)=>setSex(e.target.value)} checked={sex=='Male'?true:false} value="Male" /><label htmlFor="">Male </label>
                    <input type="radio" name="sex" onClick={(e)=>setSex(e.target.value)} checked={sex=='Unisex'?true:false}  value="Unisex" /><label htmlFor="">Unisex </label>
                </div>
                </div>
                <div>
                    <label htmlFor="">Price :</label>
                    <input value={price} type="text" onChange={(e)=>setPrice(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="">Image :</label>
                    <input type="file" ref={fileInputRef} name="image"  />
                </div>
                <div>
                        <label htmlFor="">Volume (ml) :</label>
                        <input type="text" value={volume_ml} onChange={(e)=>setVolume_ml(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Stock :</label>
                        <input type="text" value={stock} onChange={(e)=>setStock(e.target.value)} />
                    </div>
                <div style={{ marginTop: "15px" }}>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: "#dea74a",
                            color: "white",
                            padding: "10px 15px",
                            border: "none",
                            borderRadius: "5px",
                            marginRight: "10px",
                            cursor: "pointer",
                        }}
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        style={{
                            backgroundColor: "#bf9345",
                            color: "white",
                            padding: "10px 15px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
           
    </div>
//     <form onSubmit={handleSubmit}>
//     {/* ... your form fields, pre-populated with fragrance data */}
//     <input type="text" name="name" defaultValue={fragrance.name} />
//     {/* ... other fields */}
//     <input type="file" name="image" /> {/* Image upload field */}
//     {errors.name && <p className="error">{errors.name[0]}</p>}
//     {/* ... other error displays */}

//     <button type="submit">Update Fragrance</button>
// </form>
    );
};

export default EditFragrance;

/*  <form onSubmit={handleSubmit}>
                <section>
                {/* ... your form fields, pre-populated with fragrance data */
                /* <input type="text" name="name" defaultValue={fragrance.name} /> */
                /* ... other fields */
                // <input type="file" name="image" /> {/* Image upload field */}
                // {errors.name && <p className="error">{errors.name[0]}</p>}
                /* ... other error displays */
            //     </section>
            //     <section>
            //         <div>
            //             <label htmlFor="">Fragrance Name :</label>
            //             <input type="text" value={fragrance.name} onChange={(e)=>setName(e.target.value)} />
            //         </div>
            //         <div>
            //             <label htmlFor="">Choose an image :</label>
            //             <input type="file" ref={fileInputRef} />
            //         </div>
            //     </section>
            //     <section>
            //         <label htmlFor="">Release Date :</label>
            //         <input type="date" value={fragrance.release_date} onChange={(e)=>setRelease_Date(e.target.value)} />
            //     </section>
            //     <section>
            //         <div>
            //             <label htmlFor="" >Brand :</label>
            //             <select value={fragrance.brand_id}  onChange={(e)=>setBrandId(e.target.value)}>
            //                 {brands.map(brand=>(
            //                     <option value={brand.id} key={brand.id}>{brand.name}</option>
            //                 ))}
            //             </select>
            //         </div>
            //         <div>
            //             <label htmlFor="">Genre :</label>
            //             <select value={fragrance.genre} onChange={(e)=>setGenre(e.target.value)}>
            //                 <option value="Floral">Floral</option>
            //                 <option value="Woody Aromatic">Woody Aromatic</option>
            //                 <option value="Oriental Vanilla">Oriental Vanilla</option>
            //                 <option value="Citrus Aromatic">Citrus Aromatic</option>
            //                 <option value="Floriental">Floriental</option>
            //                 <option value="Oriental">Oriental</option>
            //                 <option value="Citrus Floral">Citrus Floral</option>
            //                 <option value="Fruity Floral">Fruity Floral</option>
            //                 <option value="Oriental Spicy">Oriental Spicy</option>
            //                 <option value="Citrus Spicy">Citrus Spicy</option>
            //                 <option value="Woody Oriental">Woody Oriental</option>
            //                 <option value="Woody Spicy">Woody Spicy</option>
            //                 <option value="Oriental Fougere">Oriental Fougere</option>
            //                 <option value="Floral Woody Musk">Floral Woody Musk</option>
            //                 <option value="Spicy">Spicy</option>
            //                 <option value="Fruity">Fruity</option>
            //                 <option value="Amber Floral">Amber Floral</option>
            //             </select>
            //         </div>
            //     </section>
            //     <section>
            //         <div>
            //             <label htmlFor="">Price :</label>
            //             <input value={fragrance.price} type="text" onChange={(e)=>setPrice(e.target.value)} />
            //         </div>
            //         <div>
            //             <label htmlFor="">Volume (ml) :</label>
            //             <input type="text" value={fragrance.volume_ml} onChange={(e)=>setVolume_ml(e.target.value)} />
            //         </div>
            //         <div>
            //             <label htmlFor="">Stock :</label>
            //             <input type="text" value={fragrance.stock} onChange={(e)=>setStock(e.target.value)} />
            //         </div>
            //         <div>
            //             <label htmlFor="">Sex :</label>
            //             <input type="radio"  name="sex" onClick={(e)=>setSex(e.target.value)} checked={fragrance.sex=='Female'?true:false} value="Female" /><label htmlFor="">Female </label>
            //             <input type="radio" name="sex" onClick={(e)=>setSex(e.target.value)} checked={fragrance.sex=='Male'?true:false} value="Male" /><label htmlFor="">Male </label>
            //             <input type="radio" name="sex" onClick={(e)=>setSex(e.target.value)} checked={fragrance.sex=='Unisex'?true:false}  value="Unisex" /><label htmlFor="">Unisex </label>
            //         </div>
            //     </section>
            //     <input type="submit" value="Add Fragrance" />
            // </form>