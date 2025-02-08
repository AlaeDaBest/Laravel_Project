import React, { useState } from "react";
import HeartIcon from "./Icons/HeartIcon";

const Fragrance=(props)=>{
    const [hidden,setHidden]=useState(true);
    // const dispatch=useDispatch();
    return(
        <section className="Card" onClick={()=>setHidden(!hidden)}>
            <section className="ImageSection">
                <HeartIcon fragrance={props.fragrance} />
                <img src={props.fragrance.image} width="200px" height="150px" alt="" />
            </section>
            <section className={`BookInfo ${hidden?'hidden':''}`} hidden={hidden} >
                <section>
                    <h3>{props.fragrance.name} </h3>
                    <p><span>Brand:</span>{props.fragrance.brand} </p>
                    <p><span>Release Date:</span> {props.fragrance.release_date}</p>
                    <p><span>Genre:</span>{props.fragrance.genre}</p>
                    <p><span>Sex:</span> {props.fragrance.sex}</p>
                    <p><span>Price:</span> {props.fragrance.price}</p>
                    <input type="button" value="Add To Cart" />
                </section>         
            </section>
        </section>
    )
}
export default Fragrance;