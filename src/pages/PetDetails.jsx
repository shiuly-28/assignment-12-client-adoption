import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useAuth } from "@/hooks/useAuth";
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

import handleAdopt from "../utils/handleAdopt";

const PetDetails = () => {
    const { register, handleSubmit, reset, setValue } = useForm();
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

    useEffect(() => {
        if (pet && user) {
            setValue("petId", pet._id);
            setValue("petName", pet.name);
            setValue("petImage", pet.image);
            setValue("userName", user.displayName);
            setValue("email", user.email);
        }
    }, [pet, user, setValue]);

    const onSubmit = async (data) => {
        console.log("Submitting adoption data:", data);
        await handleAdopt(data, reset);
        setOpen(false); // modal বন্ধ করা
    };

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

                    {/* ✅ Adopt Button opens modal */}
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="w-full">Adopt</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Adopt {pet?.name}</DialogTitle>
                            </DialogHeader>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                                {/* Hidden Fields */}
                                <input type="hidden" {...register("petId")} />
                                <input type="hidden" {...register("petName")} />
                                <input type="hidden" {...register("petImage")} />

                                {/* Pet Name (Disabled) */}
                                <div>
                                    <Label>Pet Name</Label>
                                    <Input value={pet?.name} disabled />
                                </div>

                                {/* Pet Image (Disabled Preview) */}
                                <div>
                                    <Label>Pet Image</Label>
                                    <img src={pet?.image} alt="Pet" className="w-24 rounded" />
                                </div>

                                {/* User Name (Disabled) */}
                                <div>
                                    <Label>Your Name</Label>
                                    <Input value={user?.displayName} disabled />
                                </div>

                                {/* Email (Disabled) */}
                                <div>
                                    <Label>Email</Label>
                                    <Input value={user?.email} disabled />
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <Label>Phone Number</Label>
                                    <Input
                                        type="text"
                                        placeholder="Enter your phone number"
                                        {...register("phone", { required: true })}
                                    />
                                </div>

                                {/* Address */}
                                <div>
                                    <Label>Address</Label>
                                    <Input
                                        type="text"
                                        placeholder="Enter your address"
                                        {...register("address", { required: true })}
                                    />
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
