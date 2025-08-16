import React from 'react';

import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';

const MainlayOut = () => {
    return (
        <div className=''>
            <header className=''>
                <Navbar></Navbar>
            </header>
            <main className='w-11/12 mx-auto'>

                <Outlet></Outlet>

            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MainlayOut;