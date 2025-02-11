import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login=({setIsLoggedIn})=> {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setErrors({});
        try {
            const response = await axios.post('/login', { // No /api/ prefix
                email,
                password,
            });
            if (response.status === 200) {
                const user = response.data.user;
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userRole', user.role);
                localStorage.setItem('user',JSON.stringify(user));
                console.log(user);
                setIsLoggedIn(true);
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
    return(
        <div>
            <form onSubmit={handleSubmit}>
                {/* ... your form fields */}
                {errors.name && <p className="error">{errors.name[0]}</p>}
                {errors.email && <p className="error">{errors.email[0]}</p>}
                {errors.password && <p className="error">{errors.password[0]}</p>}
                {/* ... other error displays */}
                {successMessage && <p className="success">{successMessage}</p>} {/* Display success message */}
                <label htmlFor="">Email :</label>
                <input type="text" name='email' onChange={(e)=>setEmail(e.target.value)} />
                <label htmlFor="">Password :</label>
                <input type="text" name='password' onChange={(e)=>setPassword(e.target.value)} />
                <button type="submit">Register</button>
            </form>
        </div>
    )
};
export default Login;