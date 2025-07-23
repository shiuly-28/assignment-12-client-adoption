import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const PetDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [open, setOpen] = useState(false);

    const { data: pet, error, isLoading } = useQuery({
        queryKey: ["pets", id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/pets/${id}`);
            return res.data;
        },
    });

    const adoptionRecquest = () => {
        alert("adoption reques")
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            pet,
            userEmail: user?.email,

            phone: "",
            address: "",

        },
        validate: (values) => {
            const errors = {};
            if (!values.phone) errors.phone = "Phone number is required";
            if (!values.address) errors.address = "Address is required";
            return errors;
        },


        onSubmit: async (values, { resetForm }) => {
            // console.log("Submitting adoption data:", values);
            try {
                const response = await axios.post("http://localhost:5000/adoptionRequests", values);
                console.log(response);
                if (response.data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: "Adoption request submitted successfully.",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                    resetForm();
                    setOpen(false);
                }
            } catch (error) {
                console.error("Adoption request failed:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong. Please try again.",
                });
            }
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading pet details.</div>;

    return (
        <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img
                        src={pet?.image}
                        alt={pet?.name}
                        className="w-full h-auto object-cover rounded-lg"
                    />
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-4">{pet?.name}</h1>
                    <p className="text-lg mb-2">
                        <span className="font-semibold">Age:</span> {pet?.age} years
                    </p>
                    <p className="text-lg mb-4">
                        <span className="font-semibold">Location:</span> {pet?.location}
                    </p>
                    <p className="text-gray-700 mb-4">{pet?.longDescription}</p>

                    {/* Adopt Modal */}
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="w-full">Adopt</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Adopt {pet?.name}</DialogTitle>
                            </DialogHeader>

                            <form onSubmit={formik.handleSubmit} className="space-y-4 mt-4">
                                {/* Hidden fields for form data */}
                                <input type="hidden" name="petId" value={formik.values.petId} />
                                <input type="hidden" name="petName" value={formik.values.petName} />
                                <input type="hidden" name="petImage" value={formik.values.petImage} />
                                <input type="hidden" name="userName" value={formik.values.userName} />
                                <input type="hidden" name="email" value={formik.values.email} />

                                {/* Pet Name */}
                                <div>
                                    <Label>Pet Name</Label>
                                    <Input value={pet?.name} disabled />
                                </div>

                                {/* Pet Image */}
                                <div>
                                    <Label>Pet Image</Label>
                                    <img src={pet?.image} alt="Pet" className="w-24 rounded" />
                                </div>

                                {/* User Info */}
                                <div>
                                    <Label>Your Name</Label>
                                    <Input value={user?.displayName} disabled />
                                </div>
                                <div>
                                    <Label>Email</Label>
                                    <Input value={user?.email} disabled />
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <Label>Phone Number</Label>
                                    <Input
                                        name="phone"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        placeholder="Enter your phone number"
                                    />
                                    {formik.errors.phone && (
                                        <p className="text-red-500 text-sm">{formik.errors.phone}</p>
                                    )}
                                </div>

                                {/* Address */}
                                <div>
                                    <Label>Address</Label>
                                    <Input
                                        name="address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        placeholder="Enter your address"
                                    />
                                    {formik.errors.address && (
                                        <p className="text-red-500 text-sm">{formik.errors.address}</p>
                                    )}
                                </div>

                                <Button type="submit" className="w-full">
                                    Submit Adoption Request
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default PetDetails;
