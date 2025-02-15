import React, { useState } from "react";
import HeartIcon from "./Icons/HeartIcon";
import CartIcon from "./Icons/CartIcon";
import { BiSolidTrash } from "react-icons/bi";
import TrashIcon from "./Icons/TrashIcon";
import axios from 'axios';

const Fragrance=(props)=>{
    const [hidden,setHidden]=useState(true);

  const AddToCart = async (fragranceId) => {
    try {
      const response = await axios.post('/cart', {
        fragrance_id: fragranceId,
        quantity: 1, 
      });
   console.log(response.data);
    } catch (error) {
      console.error("Il y a eu un problème lors de l'ajout au panier:", error);
    }
  };
    return(
        <section className="Card" onClick={()=>setHidden(!hidden)}>
            <section className="ImageSection">
                <article id="Icons">
                    <HeartIcon fragrance={props.fragrance} />
                    <CartIcon  onClick={() => AddToCart(props.fragrance.id)}/>
                </article>
                <img src={props.fragrance.image} width="200px" height="150px" alt="" />
            </section>
            <section className={`BookInfo ${hidden?'hidden':''}`} hidden={hidden} >
                <section>
                    <h3>{props.fragrance.name} </h3>
                    <p><span>Brand:</span>{props.fragrance.brand?.name} </p>
                    <p><span>Release Date:</span> {props.fragrance.release_date}</p>
                    <p><span>Genre:</span>{props.fragrance.genre}</p>
                    <p><span>Sex:</span> {props.fragrance.sex}</p>
                    <p><span>Price:</span> {props.fragrance.price}</p>
                    <div>
                        <TrashIcon id={props.fragrance.id} setFragrances={props.setFragrances} fragrances={props.fragrances} />
                    </div>
                </section>         
            </section>
        </section>
    )
}
export default Fragrance;