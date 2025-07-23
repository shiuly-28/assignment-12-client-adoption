import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const AdoptionModal = ({ pet }) => {
    console.log(pet);
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const adoptionInfo = {
            ...data,
            petId: pet._id,
            petName: pet.name,
            image: pet.image,
            status: "pending",
            requestDate: new Date(),
        };

        try {
            const res = await axios.post("http://localhost:5000/adoptionRequests", adoptionInfo);
            if (res.data.insertedId) {
                toast.success("Adoption request submitted!");
                reset();
                setOpen(false);
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong!");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Adopt</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adopt {pet?.name}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block font-medium">Phone Number</label>
                        <input
                            type="tel"
                            {...register("phone", { required: "Phone is required" })}
                            className="w-full border p-2 rounded-md"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm">{errors.phone.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium">Address</label>
                        <textarea
                            {...register("address", { required: "Address is required" })}
                            className="w-full border p-2 rounded-md"
                        />
                        {errors.address && (
                            <p className="text-red-500 text-sm">{errors.address.message}</p>
                        )}
                    </div>

                    <Button type="submit" className="w-full">
                        Confirm Adoption
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AdoptionModal;
