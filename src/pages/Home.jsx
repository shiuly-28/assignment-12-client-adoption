import React from 'react';
import Banner from './Banner';
import PetsCategory from './PetsCategory';
import CallToAction from './CallToAction';
import HowItWorks from './HowItWorks';
import WhyAdopt from './WhyAdopt';
import Testimonials from './Testimonials';
import SalesPromution from './SalesPromution';

import Newsletter from './NewsLetter';
import PetCardSection from './PetCardSection';


const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <PetsCategory></PetsCategory>
            <PetCardSection></PetCardSection>
            <CallToAction></CallToAction>
            <SalesPromution></SalesPromution>
            <HowItWorks></HowItWorks>
            <WhyAdopt></WhyAdopt>
            
            <Testimonials></Testimonials>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;