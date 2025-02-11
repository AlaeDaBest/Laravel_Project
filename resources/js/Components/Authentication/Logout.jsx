import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout=({setIsLoggedIn})=>{
    const navigate=useNavigate();
    const handleLogout = async () => { 
        try {
            const response = await axios.post('/logout');
            if (response.status === 200) {
                localStorage.removeItem('token');  
                localStorage.removeItem('userRole');
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('user');
                setIsLoggedIn(false);
                // localStorage.removeItem('isLoggedIn');
                navigate('/');
                console.log('Logout successful');
            } else {
                console.error('Logout failed:', response.data.message || 'Server error');
            }
        } catch (error) {
            console.error('Logout error:', error);
            if (error.response) {
              console.error("Server returned an error:", error.response.status, error.response.data);
            } else if (error.request) {
              console.error("No response received:", error.request);
            } else {
              console.error("Error setting up the request:", error.message);
            }
        }
    };
    return (
        <button onClick={handleLogout}>Logout</button>
    );
};
export default Logout;