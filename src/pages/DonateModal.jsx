import React, { useState } from "react";
import { Navigate } from "react-router";

const DonateModal = ({ campaignId }) => {
    const [amount, setAmount] = useState("");

    const handleSubmit = (e) => {
        // const navigatre = useNavigate();
        e.preventDefault();
        alert(`You donated $${amount} to campaign ID: ${campaignId}`);
        setAmount("");

    };

    const handleDonate = (id) => {
        Navigate(`/dashboard/donatePayment/${id}`)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block font-semibold">
                Donation Amount ($)
                <input
                    type="number"
                    value={amount}
                    min="1"
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter amount"
                />
            </label>

            <button
                onClick={() => handleDonate(DonateModal._id)}
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
                Donate
            </button>
        </form>
    );
};

export default DonateModal;
