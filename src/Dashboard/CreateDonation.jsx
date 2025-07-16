import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const imgbbAPI = import.meta.env.VITE_IMGBB_API;

const CreateDonation = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = data.petImage[0];

        const formData = new FormData();
        formData.append("image", imageFile);

        try {
            const uploadRes = await axios.post(
                `https://api.imgbb.com/1/upload?key=${imgbbAPI}`,
                formData
            );

            const imageUrl = uploadRes.data.data.url;

            const donationData = {
                petImage: imageUrl,
                maxAmount: parseFloat(data.maxAmount),
                lastDate: data.lastDate,
                shortDescription: data.shortDescription,
                longDescription: data.longDescription,
                createdAt: new Date(),
                userEmail: user.email,
                userName: user.displayName,
            };

            const res = await axios.post(
                "http://localhost:5000/donations",
                donationData
            );

            if (res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Campaign Created!",
                    text: "Your donation campaign has been created successfully.",
                    toast: true,
                    position: "top-end",
                    timer: 3000,
                    showConfirmButton: false,
                });

                reset();
                navigate("/dashboard/my-campaigns");
            }
        } catch (error) {
            console.error("Failed to create donation:", error);
            Swal.fire("Error!", "Something went wrong.", "error");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">Create Donation Campaign</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Pet Picture */}
                <div>
                    <Label>Pet Picture</Label>
                    <Input
                        type="file"
                        accept="image/*"
                        {...register("petImage", { required: true })}
                    />
                </div>

                {/* Maximum Donation Amount */}
                <div>
                    <Label>Maximum Donation Amount (৳)</Label>
                    <Input
                        type="number"
                        {...register("maxAmount", { required: true })}
                    />
                </div>

                {/* Last Date */}
                <div>
                    <Label>Last Date of Donation</Label>
                    <Input
                        type="date"
                        {...register("lastDate", { required: true })}
                    />
                </div>

                {/* Short Description */}
                <div>
                    <Label>Short Description</Label>
                    <Input
                        type="text"
                        {...register("shortDescription", { required: true })}
                    />
                </div>

                {/* Long Description */}
                <div>
                    <Label>Long Description</Label>
                    <Textarea
                        rows="5"
                        {...register("longDescription", { required: true })}
                    />
                </div>

                <Button type="submit" className="w-full">
                    Create Campaign
                </Button>
            </form>
        </div>
    );
};

export default CreateDonation;
