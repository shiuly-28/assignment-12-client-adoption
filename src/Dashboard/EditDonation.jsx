import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const EditDonation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue } = useForm();

    // fetch single donation campaign by ID
    const { data: donationData, isLoading } = useQuery({
        queryKey: ["donation", id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/donations/${id}`);
            return res.data;
        },
    });

    useEffect(() => {
        if (donationData) {
            // populate form fields
            setValue("petName", donationData.petName);
            setValue("maxAmount", donationData.maxAmount);
            setValue("shortDescription", donationData.shortDescription);
            setValue("longDescription", donationData.longDescription);
        }
    }, [donationData, setValue]);

    const onSubmit = async (data) => {
        try {
            const res = await axios.patch(`http://localhost:5000/donations/${id}`, data);
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: "Donation campaign updated successfully!",
                });
                navigate("/myDonations"); // redirect to my campaigns page
            }
        } catch (err) {
            console.error("Update failed", err);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">✏️ Edit Donation Campaign</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Label>Pet Name</Label>
                    <Input type="text" {...register("petName", { required: true })} />
                </div>

                <div>
                    <Label>Max Donation Amount ($)</Label>
                    <Input type="number" {...register("maxAmount", { required: true })} />
                </div>

                <div>
                    <Label>Short Description</Label>
                    <Textarea rows="2" {...register("shortDescription", { required: true })} />
                </div>

                <div>
                    <Label>Long Description</Label>
                    <Textarea rows="4" {...register("longDescription", { required: true })} />
                </div>

                <Button type="submit" className="w-full">
                    Update Campaign
                </Button>
            </form>
        </div>
    );
};

export default EditDonation;
