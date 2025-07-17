import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";

const imgbbAPI = import.meta.env.VITE_IMGBB_API;

const CreateDonation = () => {
    const { user } = useAuth();
    const [imageFile, setImageFile] = useState(null);

    const formik = useFormik({
        initialValues: {
            maxAmount: "",
            lastDate: "",
            shortDescription: "",
            longDescription: "",
        },
        validationSchema: Yup.object({
            maxAmount: Yup.number().required("Maximum amount is required"),
            lastDate: Yup.string().required("Last date is required"),
            shortDescription: Yup.string().required("Short description is required"),
            longDescription: Yup.string().required("Long description is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            if (!imageFile) {
                Swal.fire("Error!", "Please select a pet image!", "error");
                return;
            }

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
                    maxAmount: parseFloat(values.maxAmount),
                    lastDate: values.lastDate,
                    shortDescription: values.shortDescription,
                    longDescription: values.longDescription,
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
                    resetForm();
                    setImageFile(null);
                    console.log(res.data);
                }
            } catch (error) {
                console.error("Donation error:", error);
                Swal.fire("Error!", "Something went wrong.", "error");
            }
        },
    });

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">Create Donation Campaign</h2>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
                {/* Pet Image */}
                <div>
                    <Label>Pet Picture</Label>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                    />
                </div>

                {/* Max Amount */}
                <div>
                    <Label>Maximum Donation Amount (৳)</Label>
                    <Input
                        type="number"
                        name="maxAmount"
                        value={formik.values.maxAmount}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.maxAmount && formik.errors.maxAmount && (
                        <p className="text-red-500">{formik.errors.maxAmount}</p>
                    )}
                </div>

                {/* Last Date */}
                <div>
                    <Label>Last Date of Donation</Label>
                    <Input
                        type="date"
                        name="lastDate"
                        value={formik.values.lastDate}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.lastDate && formik.errors.lastDate && (
                        <p className="text-red-500">{formik.errors.lastDate}</p>
                    )}
                </div>

                {/* Short Description */}
                <div>
                    <Label>Short Description</Label>
                    <Input
                        type="text"
                        name="shortDescription"
                        value={formik.values.shortDescription}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.shortDescription &&
                        formik.errors.shortDescription && (
                            <p className="text-red-500">{formik.errors.shortDescription}</p>
                        )}
                </div>

                {/* Long Description */}
                <div>
                    <Label>Long Description</Label>
                    <Textarea
                        rows="5"
                        name="longDescription"
                        value={formik.values.longDescription}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.longDescription &&
                        formik.errors.longDescription && (
                            <p className="text-red-500">{formik.errors.longDescription}</p>
                        )}
                </div>

                <Button type="submit" className="w-full">
                    Create Campaign
                </Button>
            </form>
        </div>
    );
};

export default CreateDonation;
