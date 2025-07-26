import { useFormik } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Props: pet = current pet object, user = logged in user info
const AdoptModal = ({ pet, user }) => {
    console.log(pet);
    const formik = useFormik({
        initialValues: {
            adopterName: user?.user?.displayName || '',
            adopterEmail: user?.user?.email || '',
            adopterPhone: '',
            adopterLocation: '',
        },
        onSubmit: async (values) => {
            const adoptionData = {
                ...values,
                petId: pet._id,

                petName: pet.name,
                petImage: pet.image,
                petUserEmail: pet.userEmail,
                userName: user.displayName,
                userEmail: user.email,
                phoneNumber: values.adopterPhone,
                address: values.adopterLocation,
                createdAt: new Date().toISOString(),
            };
            console.log(adoptionData);

            try {
                const res = await axios.post("http://localhost:5000/api/adoptions", adoptionData);
                if (res.data.insertedId) {

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    formik.resetForm();
                }
            } catch (err) {
                console.error(err);
                Swal.fire("❌ Error", "Something went wrong!", "error");
            }
        },
        enableReinitialize: true, // Reinitialize form when initialValues change (e.g., user prop updates)
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full">Adopt Now</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adopt {pet.petName}</DialogTitle>
                </DialogHeader>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                        <Label>Pet Image</Label>
                        <img src={pet.image} alt="" />
                    </div>
                    <div>
                        <Label>Your Name</Label>
                        <Input {...formik.getFieldProps("adopterName")} required disabled={!!user?.user?.displayName} />
                    </div>
                    <div>
                        <Label>Your Email</Label>
                        <Input {...formik.getFieldProps("adopterEmail")} required disabled={!!user?.user?.email} />
                    </div>
                    <div>
                        <Label>Phone</Label>
                        <Input {...formik.getFieldProps("adopterPhone")} required placeholder="01XXXXXXXXX" />
                    </div>
                    <div>
                        <Label>Your Address</Label>
                        <Input {...formik.getFieldProps("adopterLocation")} required placeholder="Your full address" />
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