import React from 'react';
import Banner from './Banner';
import PetsCategory from './PetsCategory';
import CallToAction from './CallToAction';
import HowItWorks from './HowItWorks';
import WhyAdopt from './WhyAdopt';
import Testimonials from './Testimonials';
import SalesPromution from './SalesPromution';
import Reviews from './review';
import Newsletter from './NewsLetter';


const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <PetsCategory></PetsCategory>
            <CallToAction></CallToAction>
            <SalesPromution></SalesPromution>
            <HowItWorks></HowItWorks>
            <WhyAdopt></WhyAdopt>
            {/* <Reviews></Reviews> */}
            <Testimonials></Testimonials>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;