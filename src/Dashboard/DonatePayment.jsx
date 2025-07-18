import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

const DonatePayment = () => {
    const stripePromise = loadStripe('')
    return (
        <Element stripe={stripePromise}>

        </Element>
    );
};

export default DonatePayment;