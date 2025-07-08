import React from 'react';
import { NavLink } from 'react-router';
import logo from '../../src/assets/logo.png'
import useAuth from '../hooks/useAuth';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const NavItems = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/petListing">PetListing</NavLink></li>
        <li><NavLink to="/donation">Donation</NavLink></li>

    </>

    const handleLogout = () => {
        logOut()
            .then(result => { console.log(result) })
            .catch(error => console.log(error));
    }

    return (
        <div className="navbar bg-base-200 shadow-lg mt-6">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {NavItems}
                    </ul>
                </div>
                <div className='flex'>
                    <img className='w-20px h-[60px]' src={logo} alt="" />
                    <h2 className='mt-2 text-2xl font-bold'>Pet Adopot</h2>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {NavItems}
                </ul>
            </div>
            <div className="navbar-end gap-4">
                <input type="checkbox" value="synthwave" className="toggle theme-controller" />
                {
                    user ?
                        <button onClick={handleLogout} className='btn btn-primary text-black'>Log Out</button>
                        :
                        <Link to="/login" className='btn btn-primary text-black'>Login</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;