import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const EditUser=()=>{
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role,setRole]=useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [user,setUser]=useState(null);
    const navigate=useNavigate();
    const {id}=useParams();
    useEffect(()=>{
        axios.get(`/users/${id}`)
        .then(response=>{
            console.log(response.data)
            setUser(response.data);
        })
        .catch(error=>console.error('There was an error fetching the user',error));
    },[id]);
    useEffect(()=>{
        if(user){
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setPhone(user.phone);
            setEmail(user.email);
            setRole(user.role);
        }
    },[user])
    const Edit=()=>{
        try{
            const data={
                "first_name":first_name,
                "last_name":last_name,
                "email":email,
                "phone":phone,
                "role":role
            }
            console.log(data);
            const reponse=axios.put(`/users/${id}`,data);
            navigate('/profile');
        }catch(error){
            console.error('Error:',error);
        }
    }
    return(
        <div>
            <h1>Edit Profile :</h1>
            <form onSubmit={Edit}>
                {errors.name && <p className="error">{errors.name[0]}</p>}
                {errors.email && <p className="error">{errors.email[0]}</p>}
                {errors.password && <p className="error">{errors.password[0]}</p>}
                {successMessage && <p className="success">{successMessage}</p>} 
                <label htmlFor="">First Name :</label>
                <input type="text" name='first_name' value={first_name} onChange={(e)=>setFirstName(e.target.value)} />
                <label htmlFor="">Last Name :</label>
                <input type="text" name='last_name' value={last_name} onChange={(e)=>setLastName(e.target.value)} />
                <label htmlFor="">Phone Number :</label>
                <input type="text" name='phone' value={phone} onChange={(e)=>setPhone(e.target.value)} />
                <label htmlFor="">Email :</label>
                <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                <label htmlFor="">Role :</label>
                <input type="text" name='role' value={role} disabled />
                <label htmlFor="">Password :</label>
                <input type="text" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
                <button type="submit">Modify</button>
            </form>
        </div>
    )
}
export default EditUser;