import { useFormik } from "formik";
import Select from "react-select";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";


const petCategories = [
    { value: "Cat", label: "Cat" },
    { value: "Dog", label: "Dog" },
    { value: "Rabbit", label: "Rabbit" },
    { value: "Fish", label: "Fish" },


];


const AddPet = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const formik = useFormik({
        initialValues: {
            name: "",
            age: "",
            category: null,
            location: "",
            shortDesc: "",
            longDesc: "",
        },
        validate: (values) => {
            const errors = {};
            if (!values.name) errors.name = "Pet name is required";
            if (!values.age) errors.age = "Age is required";
            if (!values.category) errors.category = "Pet category is required";
            if (!values.location) errors.location = "Location is required";
            if (!values.shortDesc) errors.shortDesc = "Short description is required";
            if (!values.longDesc) errors.longDesc = "Long description is required";
            return errors;
        },
        onSubmit: async (values) => {
            if (!imageUrl) {
                Swal.fire({
                    icon: "warning",
                    title: "Image Missing!",
                    text: "Please upload a pet image before submitting.",
                });
                return;
            }

            try {
                const petData = {
                    ...values,
                    category: values.category.value,
                    image: imageUrl,
                    ownerEmail: user?.email
                };

                const res = await axiosSecure.post("/pets", petData);
                console.log(res.data);
                if (res.data.id) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Pet Added Successfully!",
                        showConfirmButton: false,
                        timer: 2000,
                        toast: true,
                    });
                    formik.resetForm();
                    setImageUrl("");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Failed",
                        text: "Something went wrong while saving.",
                    });
                }
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Server Error",
                    text: "Failed to add pet. Try again later.",
                });
            }
        },
    });

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            Swal.fire({
                icon: "warning",
                title: "No File Selected",
                text: "Please choose an image first.",
            });
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append("image", file);

        const imgbbAPI = import.meta.env.VITE_IMGBB_API;
        console.log(imgbbAPI);

        try {
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${imgbbAPI}`,
                formData
            );
            const uploaded = res.data.data.display_url;
            console.log("Image URL:", uploaded);
            setImageUrl(uploaded);
            Swal.fire({
                icon: "success",
                title: "Image uploaded successfully!",
                toast: true,
                timer: 1500,
                position: "top-end",
                showConfirmButton: false,
            });
        } catch (error) {
            console.error("Image upload error:", error);
            Swal.fire({
                icon: "error",
                title: "Upload Failed",
                text: "Image upload failed. Try again.",
            });
        } finally {
            setUploading(false);
        }
    };

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="space-y-4 max-w-3xl mx-auto mt-10 bg-white dark:bg-gray-900 p-6 rounded shadow"
        >
            {/* Pet Image Upload */}
            <Input type="file" accept="image/*" onChange={handleImageUpload} />
            {uploading && <p className="text-blue-500 text-sm">Uploading image...</p>}
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt="pet"
                    className="w-32 h-32 object-cover rounded-md"
                />
            )}

            {/* Pet Name */}
            <Input
                placeholder="Pet Name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
                <p className="text-red-500">{formik.errors.name}</p>
            )}

            {/* Pet Age */}
            <Input
                type="number"
                placeholder="Pet Age"
                name="age"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.age}
            />
            {formik.touched.age && formik.errors.age && (
                <p className="text-red-500">{formik.errors.age}</p>
            )}

            {/* Pet Category */}
            <Select
                name="category"
                options={petCategories}
                onChange={(option) => formik.setFieldValue("category", option)}
                onBlur={() => formik.setFieldTouched("category", true)}
                value={formik.values.category}
                placeholder="Select Category"
            />
            {formik.touched.category && formik.errors.category && (
                <p className="text-red-500">{formik.errors.category}</p>
            )}

            {/* Location */}
            <Input
                placeholder="Location"
                name="location"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.location}
            />
            {formik.touched.location && formik.errors.location && (
                <p className="text-red-500">{formik.errors.location}</p>
            )}

            {/* Short Description */}
            <Input
                placeholder="Short Description"
                name="shortDesc"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.shortDesc}
            />
            {formik.touched.shortDesc && formik.errors.shortDesc && (
                <p className="text-red-500">{formik.errors.shortDesc}</p>
            )}

            {/* Long Description */}
            <ReactQuill
                theme="snow"
                name="longDesc"
                value={formik.values.longDesc}
                onChange={(value) => formik.setFieldValue("longDesc", value)}
                onBlur={() => formik.setFieldTouched("longDesc", true)}
                placeholder="Write detailed info..."
            />
            {formik.touched.longDesc && formik.errors.longDesc && (
                <p className="text-red-500">{formik.errors.longDesc}</p>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={uploading}>
                {uploading ? "Uploading..." : "Add Pet"}
            </Button>
        </form>
    );
};

export default AddPet;
