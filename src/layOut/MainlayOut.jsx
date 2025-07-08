import React from 'react';

import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar';

const MainlayOut = () => {
    return (
        <div className='min-h-screen w-11/12 mx-auto'>
            <header className=''>
                <Navbar></Navbar>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
        </div>
    );
};

export default MainlayOut;