import { useState } from "react";
import axios from "axios";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DonatorModal = ({ campaignId }) => {
    const [open, setOpen] = useState(false);
    const [donators, setDonators] = useState([]);

    const fetchDonators = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/donations/${campaignId}/donators`
            );
            setDonators(res.data);
            setOpen(true);
        } catch (err) {
            console.error("Failed to load donators", err);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={fetchDonators}>View Donators</Button>
            </DialogTrigger>

            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl">Donators List</DialogTitle>
                </DialogHeader>

                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {donators.length > 0 ? (
                        donators.map((donor, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center border p-2 rounded-md"
                            >
                                <span className="font-medium">{donor.userName}</span>
                                <span className="text-green-600 font-semibold">
                                    ৳{donor.amount}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No donators yet.</p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DonatorModal;
