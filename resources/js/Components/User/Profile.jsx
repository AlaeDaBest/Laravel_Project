import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const UserInfo = () => {
    console.log(localStorage.getItem('userRole'));
    console.log(localStorage.getItem('user'));
    const userSession=JSON.parse(localStorage.getItem('user'))
    const [user,setUser]=useState('');
    const navigate=useNavigate();
    useEffect(()=>{
        axios.get(`/users/${userSession.id}`)
        .then(response=>{
            console.log(response.data);
            setUser(response.data);
        }).catch(error=>console.error('There was an error fetching user',error));
    },[]);
    function Delete(){
        try{
            localStorage.removeItem('token');  
            localStorage.removeItem('userRole');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('user');
            const response=axios.delete(`/users/${user.id}`);
            navigate('/');
        }catch(error){
            console.error('Failed to delete user:', error);
        }
    }
    return (
        <div>
            <section>
                <h1>Hi!</h1>
                <h2>Welcome, {user.first_name}!</h2>
                <p>Email: {user.email}</p>
                <p>First Name: {user.first_name} </p>
                <p>Last Name: {user.last_name} </p>
                <p>Phone : {user.phone} </p>
                <p>Email : {user.email} </p>
            </section>
            <section>
                <Link to={`/editProfile/${user.id}`}>Edit Profile</Link>
                <input type="submit" value="Delete account" onClick={Delete} />
            </section>
        </div>
    );
};

export default UserInfo;