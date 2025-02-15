import React from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
const EditIcon=(props)=>{
    const navigate=useNavigate()
    function SendToEdit(){
        navigate(`/editFragrance/${props.id}`);
    }
    return(
        <div onClick={SendToEdit}>
            <RiEdit2Fill size={24} />
        </div>
    )
}
export default EditIcon;