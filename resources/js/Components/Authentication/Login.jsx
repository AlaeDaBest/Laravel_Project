import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ArrowIcon from '../Fragrance/Icons/Arrow';

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
            const response = await axios.post('/login', { 
                email,
                password,
            });
            if (response.status === 200) {
                const user=response.data.user;
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
      <div className="login-container">
        <div className='login-form'>
          <ArrowIcon/>
          <h1 className='brand-name'>Luxury Fragrance</h1>
          <p className="tagline">Discover the magic of captivating scents.</p>
            <form onSubmit={handleSubmit}>
                {/* ... your form fields */}
                {errors.name && <p className="error">{errors.name[0]}</p>}
                {errors.email && <p className="error">{errors.email[0]}</p>}
                {errors.password && <p className="error">{errors.password[0]}</p>}
                {/* ... other error displays */}
                {successMessage && <p className="success">{successMessage}</p>} {/* Display success message */}
                <div className='input-group'>
                  <label htmlFor="">Email :</label>
                  <input type="text" placeholder="Your email address" name='email' onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className='input-group'>
                  <label htmlFor="">Password :</label>
                  <input type="text" placeholder="Your password" name='password' onChange={(e)=>setPassword(e.target.value)} />
                <button type="submit" className="login-btn">Register</button>
                </div>
            </form>
        </div>
      </div>
    )
};
export default Login;