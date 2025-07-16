import React, { useState } from "react";

const DonateModal = ({ campaignId }) => {
    const [amount, setAmount] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`You donated $${amount} to campaign ID: ${campaignId}`);
        setAmount("");
        // এখানে তুমি payment integration করতে পারো (Stripe, PayPal ইত্যাদি)
    };

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
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
                Donate
            </button>
        </form>
    );
};

export default DonateModal;
