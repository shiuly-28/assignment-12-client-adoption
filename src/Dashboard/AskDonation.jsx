import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import { useNavigate } from "react-router-dom";

const AskDonation = () => {
    const { register, handleSubmit, reset } = useForm();
    // const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const res = await axios.post("http://localhost:5000/donations", data);
            if (res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Created!",
                    text: "Donation campaign created successfully!",
                });
                reset(); // form reset
                // navigate("/myDonations"); // redirect
            }
        } catch (err) {
            console.error("Create failed", err);
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Something went wrong while creating the campaign.",
            });
        }


    };

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">🐾 Ask for Donation</h2>

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
                    Create Campaign
                </Button>
            </form>
        </div>
    );
};

export default AskDonation;
