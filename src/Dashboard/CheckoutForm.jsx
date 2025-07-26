import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2'; // ✅ import sweetalert2
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axiosSecure.post('/payment/create-payment-intent', { amount: 5 });
            const clientSecret = res.data.clientSecret;

            const card = elements.getElement(CardElement);
            if (!card) {
                Swal.fire('Error', 'Card element not found', 'error');
                setLoading(false);
                return;
            }

            const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card });
            if (error) {
                Swal.fire('Payment Error', error.message, 'error');
                setLoading(false);
                return;
            }

            const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
            });

            if (confirmError) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your payment is successfull",
                    showConfirmButton: false,
                    timer: 1500
                });
                setLoading(false);
                return;
            }

            if (paymentIntent.status === 'succeeded') {
                await axiosSecure.patch(`/users/subscribe/${user.email}`);
                setPaymentSuccess(true);

                // ✅ Show success alert using SweetAlert2
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your payment is successfull",
                    showConfirmButton: false,
                    timer: 1500
                });

                // Optional: Navigate to profile/dashboard
                // navigate('/dashboard/my-profile');
            }
        } catch (err) {
            Swal.fire('Error', 'Something went wrong', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement className="p-4 bg-white text-black rounded-md mb-4" />
            <button
                className={`btn w-full p-2 rounded-xl text-white ${paymentSuccess ? 'bg-green-500' : 'bg-lime-600'}`}
                type="submit"
                disabled={loading || paymentSuccess}
            >
                {paymentSuccess ? "Paid ✅" : loading ? "Processing..." : "Pay $5"}
            </button>
        </form>
    );
};

export default CheckoutForm;
