
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AllDonations = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [donors, setDonors] = useState([]);
    const [selectedPet, setSelectedPet] = useState(null);

    // Fetch all result
    const { data: result = [], refetch } = useQuery({
        queryKey: ["allCampaigns"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/donations/all");
            return res.data || [];
        },
    });

    // Handle Pause
    const handlePause = async (id) => {
        await axios.patch(`http://localhost:5000/donations/toggle-pause/${id}`);
        refetch();
    };

    // Handle View Donators
    const fetchDonors = async (id) => {
        const res = await axios.get(`http://localhost:5000/donations/donors/${id}`);
        setDonors(res.data);
    };

    // Handle Delete
    const mutation = useMutation({
        mutationFn: (id) => {
            return axios.delete(`http://localhost:5000/donations/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries("allCampaigns");
        },
    });

    const handleDelete = (id) => {
        mutation.mutate(id);
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">📋 All Donation Campaigns</h2>

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
                        {result.map((item) => (
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
                                        to={`/dashboard/editDonation/${item._id}`}
                                    >
                                        <Button>Edit</Button>
                                    </Link>

                                    <Button
                                        variant="destructive"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        Delete
                                    </Button>

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

                                                <li className="border p-2 rounded">
                                                    <p><strong>Name:</strong> {donors.petName}</p>
                                                    <p><strong>Email:</strong> {donors.userEmail}</p>
                                                    <p><strong>Amount:</strong> ${donors.amount}</p>
                                                </li>

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

export default AllDonations;
