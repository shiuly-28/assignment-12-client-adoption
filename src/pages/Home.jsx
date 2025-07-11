import React from 'react';
import Banner from './Banner';
import PetsCategory from './PetsCategory';
import CallToAction from './CallToAction';
import HowItWorks from './HowItWorks';
import WhyAdopt from './WhyAdopt';
import Testimonials from './Testimonials';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PetsCategory></PetsCategory>
            <CallToAction></CallToAction>
            <HowItWorks></HowItWorks>
            <WhyAdopt></WhyAdopt>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;