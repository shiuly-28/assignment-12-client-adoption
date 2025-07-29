import { useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import useAxios from "../hooks/useAxios";

const DonatorModal = ({ campaignId, triggerLabel = "View Donators" }) => {
    const [donators, setDonators] = useState([]);
    const [open, setOpen] = useState(false);
    const axios = useAxios();

    const fetchDonators = async () => {
        try {
            const res = await axios.get(`/api/donations/${campaignId}/donators`);
            setDonators(res.data);
            setOpen(true);
        } catch (error) {
            console.error("Error fetching donators:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={fetchDonators}>{triggerLabel}</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Donators List</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                    {donators.length > 0 ? (
                        donators.map((donor, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center border p-2 rounded-md"
                            >
                                <span>{donor.name}</span>
                                <span className="text-green-600 font-semibold">৳{donor.amount}</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No donations yet.</p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DonatorModal;
