import React from 'react';

import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';

const MainlayOut = () => {
    return (
        <div className=' w-11/12 mx-auto  '>

            <main className=''>
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