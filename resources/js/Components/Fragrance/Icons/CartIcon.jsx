import React, { useState } from "react";
import { BsCartDash } from "react-icons/bs";
import { BsCartCheckFill } from "react-icons/bs";
const CartIcon=(props)=>{
    const AddToCart = async (fragranceId) => {
        props.setOncart(true);
        console.log('ff')
        try {
            const response = await axios.post('/cart', {
                fragrance_id: fragranceId,
                quantity: 1, 
            });
            console.log(response.data);
        }catch (error) {
            console.error("Il y a eu un problème lors de l'ajout au panier:", error);
        }
      };
      console.log(props.onCart)
    return(
        <div onClick={()=>AddToCart(props.id)}>
            {props.onCart ? (
                <BsCartCheckFill color="black" size={24} />
                ) : (
                <BsCartDash color="black" size={24} />
            )}
        </div>
    )
}
export default CartIcon;