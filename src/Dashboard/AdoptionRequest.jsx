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
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";


const AdoptionRequests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [requests, setRequests] = useState([]);

    // Load requests sent for pets owned by the logged-in user
    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/api/adoption`)
                .then((res) => setRequests(res.data))
                .catch((err) => console.error(err));
        }
    }, [user]);
    console.log(user);
    const handleAccept = async (id) => {
        await axiosSecure.patch(`/api/adoption-requests/${id}/accept`);
        setRequests(prev => prev.filter(req => req._id !== id));
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Accept is succesfully",
            showConfirmButton: false,
            timer: 1500
        });
    };

    const handleReject = async (id) => {
        await axiosSecure.patch(`/api/adoption-requests/${id}/reject`);
        setRequests(prev => prev.filter(req => req._id !== id));
        Swal
            .fire({
                position: "top-end",
                icon: "success",
                title: "Reject is successfully",
                showConfirmButton: false,
                timer: 1500
            });
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Adoption Requests for Your Pets</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Pet Image</TableHead>
                        <TableHead>Pet Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Location</TableHead>


                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {requests.length > 0 ? (
                        requests.map((req, index) => (
                            <TableRow key={req._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <img src={req.petImage} alt={req.
                                        petName} className="w-16 h-16 object-cover rounded-md" />
                                </TableCell>
                                <TableCell>{req.
                                    petName}</TableCell>

                                <TableCell>{req.
                                    adopterEmail}</TableCell>
                                <TableCell>{req.

                                    phoneNumber}</TableCell>
                                <TableCell>{req.
                                    address}</TableCell>


                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button onClick={() => handleAccept(req._id)} className="bg-green-600 hover:bg-green-700 text-white">
                                            Accept
                                        </Button>
                                        <Button onClick={() => handleReject(req._id)} variant="destructive">
                                            Reject
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan="6" className="text-center text-gray-500">
                                No adoption requests found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdoptionRequests;

