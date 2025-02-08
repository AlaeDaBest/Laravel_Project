import React, { useState } from "react";
import { BsCartDash } from "react-icons/bs";
import { BsCartCheckFill } from "react-icons/bs";
const CartIcon=()=>{
    const [checked,setChecked]=useState(false);
    function check(){
        setChecked(!checked);
    }
    return(
        <div onClick={check}>
            {checked ? (
                <BsCartDash color="black" size={24} />
                ) : (
                <BsCartCheckFill color="black" size={24} />
            )}
        </div>
    )
}
export default CartIcon;