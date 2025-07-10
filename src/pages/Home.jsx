import React from 'react';
import Banner from './Banner';
import PetsCategory from './PetsCategory';
import CallToAction from './CallToAction';
import HowItWorks from './HowItWorks';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PetsCategory></PetsCategory>
            <CallToAction></CallToAction>
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default Home;