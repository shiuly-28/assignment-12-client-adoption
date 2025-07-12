import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import axios from 'axios';
import {
    useQuery
} from '@tanstack/react-query'
import { useParams } from "react-router";

const AdoptDetails = ({ open, setOpen, pet, user }) => {
    const { register, handleSubmit, reset, setValue } = useForm()
    const { id } = useParams();
    const { data, error, isLoading } = useQuery({
        queryKey: ['pets', id],
        queryFn: async () => {
            const res = await axios.post(`http://localhost:5000/${adoptions}`)

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
        console.log(data);
        try {
            await axios.post("/api/adoptions", data)
            alert("Adoption request submitted successfully!")
            reset()
            setOpen(false)
        } catch (error) {
            console.error("Adoption error", error)
            alert("Something went wrong.")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        Adopt {pet?.name}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Hidden fields */}
                    <input type="hidden" {...register("petId")} />
                    <input type="hidden" {...register("petName")} />
                    <input type="hidden" {...register("petImage")} />

                    {/* User Name (disabled) */}
                    <div>
                        <Label>Your Name</Label>
                        <Input type="text" disabled {...register("userName")} />
                    </div>

                    {/* Email (disabled) */}
                    <div>
                        <Label>Email</Label>
                        <Input type="email" disabled {...register("email")} />
                    </div>

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
            </DialogContent>
        </Dialog>
    )

};

export default AdoptDetails;