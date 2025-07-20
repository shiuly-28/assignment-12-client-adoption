import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router';

import toast from "react-hot-toast";
import { useAuth } from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const axiosSecoure = useAxiosSecure();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await axiosSecoure.post('/payment/create-payment-intent', { amount: 5 }); // $5
        const clientSecret = res.data.clientSecret;

        const card = elements.getElement(CardElement);
        if (!card) {
            toast.error("Card element not found");
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card });

        if (error) {
            toast.error(error.message);
            return;
        }

        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
        });

        if (confirmError) {
            toast.error(confirmError.message);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            await axiosSecoure.patch(`/users/subscribe / ${user.email}`);
            toast.success('Subscription Activated!');
            navigate('/dashboard/my-profile');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement className="p-4 bg-white text-black rounded-md mb-4" />
            <button className="btn bg-lime-600 text-white" type="submit">Pay $5</button>
        </form>
    );
};

export default CheckoutForm;