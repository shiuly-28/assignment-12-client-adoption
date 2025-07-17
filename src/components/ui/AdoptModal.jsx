import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Props: pet = current pet object, user = logged in user info
const AdoptModal = ({ pet, user }) => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        const adoptionData = {
            ...data,
            petId: pet._id,
            petName: pet.petName,
            petImage: pet.petImage,
            petUserEmail: pet.userEmail,
            adopterEmail: user.email,
            status: "pending",
            date: new Date().toISOString()
        };

        try {
            const res = await axios.post("http://localhost:5000/api/adoptions", adoptionData);
            if (res.data.insertedId) {
                Swal.fire("✅ Success", "Adoption request sent!", "success");
                reset();
            }
        } catch (err) {
            console.error(err);
            Swal.fire("❌ Error", "Something went wrong!", "error");
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full">Adopt Now</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adopt {pet.petName}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label>Your Name</Label>
                        <Input {...register("adopterName")} required defaultValue={user.displayName} />
                    </div>
                    <div>
                        <Label>Phone</Label>
                        <Input {...register("adopterPhone")} required placeholder="01XXXXXXXXX" />
                    </div>
                    <div>
                        <Label>Your Address</Label>
                        <Input {...register("adopterLocation")} required placeholder="Your full address" />
                    </div>
                    <Button type="submit" className="w-full">
                        Submit Request
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AdoptModal;
