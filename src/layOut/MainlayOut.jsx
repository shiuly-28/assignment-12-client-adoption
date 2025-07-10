import React from 'react';

import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';

const MainlayOut = () => {
    return (
        <div className='min-h-screen w-11/12 mx-auto  '>

            <main className='bg-gray-100'>
                <header className=''>
                    <Navbar></Navbar>
                </header>
                <Outlet></Outlet>
                <footer>
                    <Footer></Footer>
                </footer>
            </main>

        </div>
    );
};

export default MainlayOut;