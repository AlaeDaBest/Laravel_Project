import React, { useState } from 'react';
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';
const Registration=()=>{
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [adress, setAdress] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        try {
            console.log(adress);
            const response = await axios.post('/register', {
                first_name,
                last_name,
                email,
                adress,
                phone,
                password
            });
            if (response.status === 201) {
                const data = response.data;
                localStorage.setItem('token', data.token);
                localStorage.setItem('userRole', data.user.role);
                setSuccessMessage('Registration successful!'); 
                setFirstName(''); 
                setLastName(''); 
                setEmail(''); 
                setAdress(''); 
                setPhone(''); 
                setPassword(''); 
                navigate('/');
            } else {
                console.error('Registration failed:', response.data.message || 'Server error');
                if (response.data.errors) {
                  setErrors(response.data.errors);
                }
            }
        } catch (error) {
            console.error('Registration error:', error);
            if (error.response && error.response.data && error.response.data.errors) {
              setErrors(error.response.data.errors);
            } else if (error.response){
              console.error("Server returned an error:", error.response.status, error.response.data);
            } else if (error.request) {
              console.error("No response received:", error.request);
            } else {
              console.error("Error setting up the request:", error.message);
            }
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            {/* ... your form fields */}
            {errors.name && <p className="error">{errors.name[0]}</p>}
            {errors.email && <p className="error">{errors.email[0]}</p>}
            {errors.password && <p className="error">{errors.password[0]}</p>}
            {/* ... other error displays */}
            {successMessage && <p className="success">{successMessage}</p>} {/* Display success message */}
            <label htmlFor="">First Name :</label>
            <input type="text" name='first_name' onChange={(e)=>setFirstName(e.target.value)} />
            <label htmlFor="">Last Name :</label>
            <input type="text" name='last_name' onChange={(e)=>setLastName(e.target.value)} />
            <label htmlFor="">Phone Number :</label>
            <input type="text" name='phone' onChange={(e)=>setPhone(e.target.value)} />
            <label htmlFor="">Email :</label>
            <input type="text" name='email' onChange={(e)=>setEmail(e.target.value)} />
            <label htmlFor="">Address :</label>
            <input type="text" name='adress' onChange={(e)=>setAdress(e.target.value)} />
            <label htmlFor="">Password :</label>
            <input type="text" name='password' onChange={(e)=>setPassword(e.target.value)} />
            <button type="submit">Register</button>
        </form>
    );
};

export default Registration;