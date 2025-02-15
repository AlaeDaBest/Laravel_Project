import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logout from "../Authentication/Logout";
const Header=({isLoggedIn,setIsLoggedIn})=>{
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));
    console.log(userRole);
    // const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
    console.log(isLoggedIn)
    return(
        <header>
            <nav>
                <div>
                    <NavLink to='/' className={({isActive})=>(isActive? 'active-link':'')} >Home</NavLink>
                    <NavLink to='/fragrances' className={({isActive})=>(isActive? 'active-link':'')} >Fragrances</NavLink>
                    <NavLink to='/about'>About</NavLink>
                    <NavLink to='/addFragrance' className={({isActive})=>(isActive? 'active-link':'')} >Add </NavLink>
                </div>
                <div>
                    <Link to='/cart'>Cart</Link>
                    <Link to='/favorites'>Favorites</Link>
                    <Link to='/users'>Users</Link>
                </div>
            </nav>
            <nav id="auth">
                {isLoggedIn?
                <div>
                    <NavLink to='/profile'>Profile</NavLink>
                    <Logout setIsLoggedIn={setIsLoggedIn} />
                </div>
                    :
                <div>
                    <NavLink to='/register'>Register</NavLink>
                    <NavLink to='/login'>Log In</NavLink>
                </div>
                }
            </nav>
        </header>
    )
}
export default Header;