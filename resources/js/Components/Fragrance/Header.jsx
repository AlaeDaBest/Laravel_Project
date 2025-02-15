import React from "react";
import { Link, NavLink } from "react-router-dom";
const Header=(props)=>{
    return(
        <header className="Fragrance_header">
            <nav>
                <div>
                    <NavLink to='/' className={({isActive})=>(isActive? 'active-link':'')} >Home</NavLink>
                    <NavLink to='/fragrances' className={({isActive})=>(isActive? 'active-link':'')} >Fragrances</NavLink>
                    <NavLink to='/about'>About</NavLink>
                    <NavLink to='/addFragrance' className={({isActive})=>(isActive? 'active-link':'')} >Add </NavLink>
                </div>
                <div>
                    <input type="text" name="" id="" onChange={(e)=>props.setSearchedTerm(e.target.value)} />
                    <input type="button" value="Search" />
                </div>
                <div>
                    <Link to='/cart'>Cart</Link>
                    <Link to='/favorites'>Favorites</Link>
                    <Link to='/users'>Users</Link>
                </div>               
            </nav> 
            <nav id="auth">
                {props.isLoggedIn?
                <div>
                    <NavLink to='/profile'>Profile</NavLink>
                    <Logout setIsLoggedIn={props.setIsLoggedIn} />
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