import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyDonationCampaigns = () => {
    const { user } = useAuth();
    const [donors, setDonors] = useState({});
    const [selectedPet, setSelectedPet] = useState(null);
    const axiosSecure = useAxiosSecure();

    const { data: campaigns = [], refetch } = useQuery({
        queryKey: ["myCampaigns", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get("/donations", {
                params: { email: user?.email },
            });
            return res.data?.campaigns || [];
        },
    });

    const handlePause = async (id) => {
        await axiosSecure.patch(`/donations/toggle-pause/${id}`);
        refetch();
    };

    const fetchDonors = async (id) => {
        try {
            const res = await axiosSecure.get(`/donations/donors/${id}`);
            console.log(res);
            setDonors(res.data || {});
        } catch (error) {
            console.error("Failed to fetch donors", error);
            setDonors({}); // fallback
        }
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
                                        variant={item.paused ? "default" : "destructive"}
                                        onClick={() => handlePause(item._id)}
                                    >
                                        {item.paused ? "Unpause" : "Pause"}
                                    </Button>

                                    <Link
                                        onClick={() =>
                                            (window.location.href = `/dashboard/editDonation/${item._id}`)
                                        }
                                    >
                                        Edit
                                    </Link>

                                    {/* ✅ Donor Modal */}
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                onClick={() => {
                                                    setSelectedPet(item.petName);
                                                    fetchDonors(item._id); // fetch before open
                                                }}
                                            >
                                                View Donator
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Donator of {selectedPet}</DialogTitle>
                                            </DialogHeader>


                                            <div className="mt-4 border p-3 rounded bg-gray-50 space-y-1">
                                                <p>
                                                    <strong>Name:</strong> {donors.petNameame}
                                                </p>
                                                <p>
                                                    <strong>Email:</strong> {donors.userEmail}
                                                </p>
                                                <p>
                                                    <strong>Amount:</strong> ${donors.amount}
                                                </p>
                                            </div>

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
