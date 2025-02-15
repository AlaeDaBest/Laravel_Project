import React, { useState } from "react";
import HeartIcon from "./Icons/HeartIcon";
import CartIcon from "./Icons/CartIcon";
import { BiSolidTrash } from "react-icons/bi";
import TrashIcon from "./Icons/TrashIcon";
import EditFragrance from "./EditFragrance";
import EditIcon from "./Icons/EditIcon";
import axios from 'axios';
const Fragrance=(props)=>{
    const [hidden,setHidden]=useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [onCart,setOncart]=useState(false);
    const AddToCart = async (fragranceId) => {
        try {
          const response = await axios.post('/cart', {
            fragrance_id: fragranceId,
            quantity: 1, 
          });
        } catch (error) {
          console.error("Error adding fragrance to the cart:", error);
        }
      };
    return(
        <section className="Card"  onClick={()=>setHidden(!hidden)}>
            <section className="ImageSection">
                <article id="Icons">
                    <HeartIcon fragrance={props.fragrance} />
                    <CartIcon  onCart={onCart} setOncart={setOncart}id={props.fragrance.id}  AddToCart={AddToCart} />
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
                        <EditIcon id={props.fragrance.id} setIsEditing={setIsEditing} />
                    </div>
                </section>         
            </section>
        </section>
    )
}
export default Fragrance;