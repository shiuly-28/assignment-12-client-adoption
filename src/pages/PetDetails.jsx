import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import axios from 'axios';
import {
    useQuery
} from '@tanstack/react-query';
import { useParams } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import handleAdopt from "./handleAdopt";

const PetDetails = () => {
    const { register, handleSubmit, reset, setValue } = useForm()
    const { id } = useParams();
    const { user } = useAuth();

    const { data: pet, error, isLoading } = useQuery({
        queryKey: ['pets', id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/pets/${id}`)
            return res.data
        }
    });

    useEffect(() => {
        if (pet && user) {
            setValue("petId", pet._id)
            setValue("petName", pet.name)
            setValue("petImage", pet.image)
            setValue("userName", user.displayName)
            setValue("email", user.email)
        }
    }, [pet, user, setValue])

    const onSubmit = async (data) => {
        handleAdopt(data, reset);
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading pet details.</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img src={pet?.image} alt={pet?.name} className="w-full h-auto object-cover rounded-lg" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-4">{pet?.name}</h1>
                    <p className="text-lg mb-2"><span className="font-semibold">Age:</span> {pet?.age} years old</p>
                    <p className="text-lg mb-4"><span className="font-semibold">Location:</span> {pet?.location}</p>
                    <p className="text-gray-700 mb-4">{pet?.longDescription}</p>

                    <div className="bg-gray-100 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Adopt {pet?.name}</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Hidden fields */}
                            <input type="hidden" {...register("petId")} />
                            <input type="hidden" {...register("petName")} />
                            <input type="hidden" {...register("petImage")} />

                            {/* User Name (disabled) */}
                            <Input
                                type="text"
                                disabled
                                {...register("userName")}
                                defaultValue={user?.displayName}
                            />

                            {/* Email (disabled) */}
                            <Input
                                type="email"
                                disabled
                                {...register("email")}
                                defaultValue={user?.email}
                            />

                            {/* Phone Number */}
                            <div>
                                <Label>Phone Number</Label>
                                <Input type="text" placeholder="Enter your phone number" {...register("phone", { required: true })} />
                            </div>

                            {/* Address */}
                            <div>
                                <Label>Address</Label>
                                <Input type="text" placeholder="Enter your address" {...register("address", { required: true })} />
                            </div>

                            <Button type="submit" className="w-full">Submit Adoption Request</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PetDetails;