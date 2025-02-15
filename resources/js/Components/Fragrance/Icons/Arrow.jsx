import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Navigate, useNavigate } from "react-router-dom";
const ArrowIcon=()=>{
    const navigate=useNavigate();
    function Navigate(){
        navigate('/');
    }
    return(
        <div onClick={Navigate} id="arrow">
            <FaArrowLeft size={24}  color="#bf9345" />
        </div>
    )
}
export default ArrowIcon;