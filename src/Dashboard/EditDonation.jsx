import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditDonation = () => {
    const { id } = useParams();
    // const navigate = useNavigate();

    const [donation, setDonation] = useState(null);
    const [formData, setFormData] = useState({
        petName: "",
        amount: "",
        maxAmount: "",
        lastDate: "",
        shortDescription: "",
        longDescription: "",
    });

    // 🔄 Existing data fetch
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/donations/${id}`)
            .then((res) => {
                setDonation(res.data);
                setFormData({
                    petName: res.data.petName,
                    amount: res.data.amount,
                    maxAmount: res.data.maxAmount,
                    lastDate: res.data.lastDate?.slice(0, 10),
                    shortDescription: res.data.shortDescription,
                    longDescription: res.data.longDescription,
                });
            })
            .catch((error) => {
                console.error("Failed to fetch donation:", error);
                alert("Donation data load ");
            });
    }, [id]);

    // 🔄 input change handle
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ update submit handle
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/donations/${id}`, formData);
            alert("Donation updated successfully!");
            // navigate("/dashboard/all-donations");
        } catch (error) {
            console.error("Update failed", error);
            alert("Update Error");
        }
    };

    if (!donation) return <p>Loading donation info...</p>;

    return (
        <div className="max-w-xl mx-auto mt-10 p-5 border rounded shadow bg-white">
            <h2 className="text-2xl font-semibold mb-4">Edit Donation</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="petName"
                    value={formData.petName}
                    onChange={handleChange}
                    placeholder="Pet Name"
                    className="input border p-2 rounded w-full"
                    required
                />
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Amount Collected"
                    className="input border p-2 rounded  w-full"
                    required
                />
                <input
                    type="number"
                    name="maxAmount"
                    value={formData.maxAmount}
                    onChange={handleChange}
                    placeholder="Target Amount"
                    className="input border p-2 rounded  w-full"
                    required
                />
                <input
                    type="date"
                    name="lastDate"
                    value={formData.lastDate}
                    onChange={handleChange}
                    className="input border p-2 rounded  w-full"
                    required
                />
                <textarea
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    placeholder="Short Description"
                    className=" border p-2 rounded  w-full"
                    required
                />
                <textarea
                    name="longDescription"
                    value={formData.longDescription}
                    onChange={handleChange}
                    placeholder="Long Description"
                    className=" border rounded  p-2 w-full"
                    required
                />
                <button type="submit" className="btn bg-lime-400 border p-2 rounded w-full">
                    Update Donation
                </button>
            </form>
        </div>
    );
};

export default EditDonation;


