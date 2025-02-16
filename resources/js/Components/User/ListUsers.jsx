import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
const ListUsers=()=>{
    const [users,setUsers]=useState([]);
    useEffect(()=>{
        axios.get('/users')
        .then(response=>{
            console.log(response.data);
            setUsers(response.data);
        }).catch(error=>console.error('Error fetching the users:',error));
    },[]);
    const navigate=useNavigate();
    function ToggleRole(user){
        return async (e)=>{
            try{
                let data={
                    "first_name":user.first_name,
                    "last_name":user.last_name,
                    "email":user.email,
                    "role":e.target.value,
                    "phone":user.phone
                }
                const response=axios.put(`/users/${user.id}`,data);
                navigate('/users');
            }catch(error){
                console.error('user update error:', error);
                if (error.response && error.response.data && error.response.data.errors) {
                  setErrors(error.response.data.errors);
                } else if (error.response){
                  console.error("Server returned an error:", error.response.status, error.response.data);
                } else if (error.request) {
                  console.error("No response received:", error.request);
                } else {
                  console.error("Error setting up the request:", error);
                }
            }
        }
    }
    function Delete(user){
        try{
            const response=axios.delete(`/users/${user.id}`);
            setUsers(users.filter(u => u.id !== user.id)); 
            navigate('/users');
        }catch(error){
            console.error('Failed to delete user:', error);
        }
    }
    return(
        <div>
            <Header/>
            <main>
                <h1>Users</h1>
                <section>
                    <table>
                        <tr>
                            <th>Fisrt Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Phone Number</th>
                            <th>Action</th>
                        </tr>
                        {users.map(user=>(
                            <tr key={user.id} >
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <select onChange={ToggleRole(user)}>
                                        <option value="admin" selected={user.role=="customer"?true:false} >Admin</option>
                                        <option value="customer" selected={user.role=="customer"?true:false} >Customer</option>
                                    </select>
                                </td>
                                <td>{user.phone}</td>
                                <td>
                                    <input type="submit" value="Delete" onClick={()=>Delete(user)} />
                                </td>
                            </tr>
                        ))}
                    </table>
                </section>
            </main>
        </div>
    )
}
export default ListUsers;