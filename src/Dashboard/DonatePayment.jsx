// DonatePayment.jsx

import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams, useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_payment_Key);

const DonatePayment = () => {
    const { id } = useParams(); // campaignId
    const location = useLocation();
    const amount = new URLSearchParams(location.search).get("amount") || "5";

    return (
        <Elements stripe={stripePromise}>
            <div className="max-w-md mx-auto mt-10 p-6 border bg-gray-100 rounded shadow">
                <h1 className="text-xl font-semibold mb-4">Donate to Campaign</h1>
                <p className="mb-4 bg-amber-200 p-2 rounded-xl">Amount: ${amount}</p>
                <CheckoutForm campaignId={id} amount={amount} />
            </div>
        </Elements>
    );
};

export default DonatePayment;
