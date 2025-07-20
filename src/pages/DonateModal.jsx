import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DonateModal = ({ campaignId }) => {
    const [amount, setAmount] = useState(""); // ❗এই লাইনে ভুল ছিল
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/dashboard/donatePayment/${campaignId}?amount=${amount}`); // ✅ amount পাঠাও query param এ
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
                    className="mt-1 block w-full rounded-md border px-3 py-2"
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
