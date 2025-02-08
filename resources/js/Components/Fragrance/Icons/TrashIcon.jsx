import React from "react";
import { BiSolidTrash } from "react-icons/bi";
import axios from "axios";
const TrashIcon=(props)=>{
    function Delete(){
        try{
            axios.delete(`/fragrances/${props.id}`);
            props.setFragrances(props.fragrances.filter((fragrance)=>fragrance.id!==props.id));
            console.log('Fragrance Deleted Successfully!')
        }catch(error){
            console.error('Error deleting fragrance:',error);
        }
    }
    return(
        <div onClick={Delete}>
            <BiSolidTrash color="black" size={24} />
        </div>
    )
}
export default TrashIcon;