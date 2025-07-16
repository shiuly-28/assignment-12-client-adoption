import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "react-router";

const MyDonationCampaigns = () => {
    const { user } = useAuth();
    const [donors, setDonors] = useState([]);
    const [selectedPet, setSelectedPet] = useState(null);

    // Fetch my campaigns
    const { data: campaigns = [], refetch } = useQuery({
        queryKey: ["myCampaigns", user?.email],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/donations", {
                params: { email: user?.email },
            });
            return res.data?.campaigns || [];
        },
    });

    // Handle Pause
    const handlePause = async (id) => {
        await axios.patch(`http://localhost:5000/donations/pause/${id}`);
        refetch();
    };

    // Handle View Donators
    const fetchDonors = async (id) => {
        const res = await axios.get(`http://localhost:5000/donations/donors/${id}`);
        setDonors(res.data);
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">📋 My Donation Campaigns</h2>

            <div className="overflow-x-auto">
                <table className="table w-full border">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-3">Pet Name</th>
                            <th className="p-3">Max Amount</th>
                            <th className="p-3">Progress</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.map((item) => (
                            <tr key={item._id} className="border-b">
                                <td className="p-3">{item.petName}</td>
                                <td className="p-3">${item.maxAmount}</td>
                                <td className="p-3 w-1/3">
                                    <Progress
                                        value={(item.totalDonated / item.maxAmount) * 100}
                                        className="h-3"
                                    />
                                    <span className="text-sm text-gray-600">
                                        ${item.totalDonated || 0} / ${item.maxAmount}
                                    </span>
                                </td>
                                <td className="p-3 space-x-2">
                                    <Button
                                        variant="destructive"
                                        onClick={() => handlePause(item._id)}
                                    >
                                        Pause
                                    </Button>

                                    <Link
                                        onClick={() => (window.location.href = `/dashboard/editDonation/${item._id}`)}
                                    >
                                        Edit
                                    </Link>

                                    {/* View Donators modal */}
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                onClick={() => {
                                                    setSelectedPet(item.petName);
                                                    fetchDonors(item._id);
                                                }}
                                            >
                                                View Donators
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Donors of {selectedPet}</DialogTitle>
                                            </DialogHeader>
                                            <ul className="mt-4 space-y-2">
                                                {donors.length ? (
                                                    donors.map((donor, idx) => (
                                                        <li key={idx} className="border p-2 rounded">
                                                            <p><strong>Name:</strong> {donor.name}</p>
                                                            <p><strong>Email:</strong> {donor.email}</p>
                                                            <p><strong>Amount:</strong> ${donor.amount}</p>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <p className="text-gray-500">No donors yet.</p>
                                                )}
                                            </ul>
                                        </DialogContent>
                                    </Dialog>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyDonationCampaigns;
