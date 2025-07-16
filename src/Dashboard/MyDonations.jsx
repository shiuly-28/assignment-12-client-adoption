import { useEffect, useState } from "react";
import axios from "axios";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useAuth } from "../hooks/useAuth";

const MyDonations = () => {
    const { user } = useAuth();
    const [donations, setDonations] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        if (!user?.email) return;

        axios
            .get(`http://localhost:5000/donations?email=${user?.email}`)
            .then((res) => {
                console.log("API response:", res.data);
                if (Array.isArray(res.data)) {
                    setDonations(res.data);
                } else {
                    console.warn("Unexpected data type from API");
                    setDonations([]);
                }
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                setDonations([]);
            });

        // if (userEmail?.email) {
        //     donations();
        // }
    }, [user]);

    const handleRefund = async () => {
        if (!selectedId) return;
        try {
            await axios.delete(`http://localhost:5000/api/refund/${selectedId}`);
            setDonations((prev) => prev.filter((d) => d._id !== selectedId));
            setSelectedId(null);
        } catch (error) {
            console.error("Refund failed", error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">My Donations</h2>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Pet Name</TableHead>
                        <TableHead>Donated Amount (৳)</TableHead>
                        <TableHead>Refund</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {donations.length > 0 ? (
                        donations.map((item, index) => (
                            <TableRow key={item._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <img
                                        src={item.petImage}
                                        alt={item.petName}
                                        className="w-16 h-16 rounded object-cover"
                                    />
                                </TableCell>
                                <TableCell>{item.petName}</TableCell>
                                <TableCell>{item.amount}</TableCell>
                                <TableCell>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="destructive"
                                                onClick={() => setSelectedId(item._id)}
                                            >
                                                Ask for Refund
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Are you sure you want to request a refund?
                                                </AlertDialogTitle>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={handleRefund}>
                                                    Yes, Refund
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center text-gray-500">
                                No donations found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default MyDonations;
