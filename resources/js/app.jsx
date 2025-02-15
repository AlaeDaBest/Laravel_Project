import './bootstrap';
import '../css/app.css';
import '../css/login.css';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Components/Home/Home';
import { HashRouter, Route, Routes } from 'react-router-dom';
import ListFragrances from './Components/Fragrance/ListFragrances';
import AddFragrance from './Components/Fragrance/AddFragrance';
import Registration from './Components/Authentication/Registration';
import Login from './Components/Authentication/Login';
import Profile from './Components/User/Profile';
import EditFragrance from './Components/Fragrance/EditFragrance';
import ListUsers from './Components/User/ListUsers';
import EditUser from './Components/User/EditUser';

const App=()=>{
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));
    console.log(userRole);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true'); 
    console.log(isLoggedIn)
    useEffect(() => {
        localStorage.setItem('isLoggedIn', isLoggedIn);
    }, [isLoggedIn]);
    return(
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/fragrances" element={<ListFragrances isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                {/* <Route path="/favoritess" element={<ListFavorites/>} /> */}
                {/* <Route path="/cart" element={<ListCart/>} /> */}
                <Route path="/addFragrance" element={<AddFragrance/>} />
                <Route path="/editFragrance/:id" element={<EditFragrance/>} />
                <Route path="/register" element={<Registration/>} />
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/users" element={<ListUsers />} />
                <Route path="/editProfile/:id" element={<EditUser />} />
            </Routes>
        </HashRouter>
    );
}



ReactDOM.createRoot(document.getElementById('app')).render(<App/>);