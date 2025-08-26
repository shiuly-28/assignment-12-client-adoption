import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const AdoptionRequests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [requests, setRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const requestsPerPage = 8;

    // Load adoption requests
    useEffect(() => {
        if (user?.email) {
            axiosSecure
                .get(`/api/adoption`)
                .then((res) => setRequests(res.data))
                .catch((err) => console.error(err));
        }
    }, [user, axiosSecure]);

    // Accept handler
    const handleAccept = async (id) => {
        try {
            await axiosSecure.patch(`/api/adoption-requests/${id}/accept`);
            setRequests((prev) =>
                prev.map((req) =>
                    req._id === id ? { ...req, status: "accepted" } : req
                )
            );
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Request Accepted",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error(error);
        }
    };

    // Reject handler
    const handleReject = async (id) => {
        try {
            await axiosSecure.patch(`/api/adoption-requests/${id}/reject`);
            setRequests((prev) =>
                prev.map((req) =>
                    req._id === id ? { ...req, status: "rejected" } : req
                )
            );
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Request Rejected",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error(error);
        }
    };

    // Pagination logic
    const totalPages = Math.ceil(requests.length / requestsPerPage);
    const startIdx = (currentPage - 1) * requestsPerPage;
    const currentRequests = requests.slice(startIdx, startIdx + requestsPerPage);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Adoption Requests for Your Pets</h2>
            <Table>
                <TableHeader className="bg-gray-300 rounded-2xl">
                    <TableRow >
                        <TableHead>#</TableHead>
                        <TableHead>Pet Image</TableHead>
                        <TableHead>Pet Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentRequests.length > 0 ? (
                        currentRequests.map((req, index) => (
                            <TableRow key={req._id}>
                                <TableCell>{startIdx + index + 1}</TableCell>
                                <TableCell>
                                    <img
                                        src={req.petImage}
                                        alt={req.petName}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                </TableCell>
                                <TableCell>{req.petName}</TableCell>
                                <TableCell>{req.adopterEmail}</TableCell>
                                <TableCell>{req.phoneNumber}</TableCell>
                                <TableCell>{req.address}</TableCell>
                                <TableCell className="capitalize font-medium">
                                    {req.status || "pending"}
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => handleAccept(req._id)}
                                            className="bg-green-600 hover:bg-green-700 text-white"
                                            disabled={req.status === "accepted"}
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            onClick={() => handleReject(req._id)}
                                            variant="destructive"
                                            disabled={req.status === "rejected"}
                                        >
                                            Reject
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan="8" className="text-center text-gray-500">
                                No adoption requests found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
};

export default AdoptionRequests;
