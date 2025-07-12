import { useFormik } from "formik";
import Select from "react-select";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Swal from "sweetalert2";

const petCategories = [
    { value: "Cat", label: "Cat" },
    { value: "Dog", label: "Dog" },
    { value: "Rabbit", label: "Rabbit" },
    { value: "Fish", label: "Fish" },
];

const AddPet = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [uploading, setUploading] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            age: "",
            category: null,
            location: "",
            shortDesc: "",
            longDesc: "",
        },
        validate: values => {
            const errors = {};
            if (!values.name) {
                errors.name = 'Pet name is required';
            }
            if (!values.age) {
                errors.age = 'Age is required';
            }
            if (!values.category) {
                errors.category = 'Pet category is required';
            }
            if (!values.location) {
                errors.location = 'Location is required';
            }
            if (!values.shortDesc) {
                errors.shortDesc = 'Short description is required';
            }
            if (!values.longDesc) {
                errors.longDesc = 'Long description is required';
            }
            return errors;
        },
        onSubmit: async (values) => {

            if (!imageUrl) {
                alert("Please upload an image first.");
                return;
            }

            try {
                const petData = {
                    ...values,
                    category: values.category.value, // extract category value
                    image: imageUrl,
                    // dateAdded: new Date().toISOString(),
                    // adopted: false,
                };

                // console.log(petData);

                const res = await axios.post("http://localhost:5000/api/pets", petData);
                console.log(res.data);
                if (res.data.id) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    alert("Pet Added Successfully!");
                    formik.resetForm();
                    setImageUrl("");
                }
            } catch (error) {
                console.error(error);
            }
        },
    });

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            alert("No file selected");
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append("image", file);
        const imgbbApiKey = "27cbf434b2a537332489292a928e4d48";

        try {
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
                formData
            );
            setImageUrl(res.data.data.display_url);
        } catch (error) {
            console.error("Image upload failed", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="space-y-4 max-w-3xl mx-auto mt-10"
        >
            {/* Pet Image Upload */}
            <Input type="file" onChange={handleImageUpload} />
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
            {formik.touched.name && formik.errors.name ? (
                <p className="text-red-500">{formik.errors.name}</p>
            ) : null}

            {/* Pet Age */}
            <Input
                type="number"
                placeholder="Pet Age"
                name="age"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.age}
            />
            {formik.touched.age && formik.errors.age ? (
                <p className="text-red-500">{formik.errors.age}</p>
            ) : null}

            {/* Pet Category (react-select) */}
            <Select
                name="category"
                options={petCategories}
                onChange={(option) => formik.setFieldValue("category", option)}
                onBlur={() => formik.setFieldTouched("category", true)}
                value={formik.values.category}
                placeholder="Select Category"
            />
            {formik.touched.category && formik.errors.category ? (
                <p className="text-red-500">{formik.errors.category}</p>
            ) : null}


            {/* Location */}
            <Input
                placeholder="Location"
                name="location"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.location}
            />
            {formik.touched.location && formik.errors.location ? (
                <p className="text-red-500">{formik.errors.location}</p>
            ) : null}

            {/* Short Description */}
            <Input
                placeholder="Short Description"
                name="shortDesc"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.shortDesc}
            />
            {formik.touched.shortDesc && formik.errors.shortDesc ? (
                <p className="text-red-500">{formik.errors.shortDesc}</p>
            ) : null}

            {/* Long Description (React Quill) */}
            <ReactQuill
                theme="snow"
                name="longDesc"
                value={formik.values.longDesc}
                onChange={(value) => formik.setFieldValue("longDesc", value)}
                onBlur={() => formik.setFieldTouched("longDesc", true)}
                placeholder="Write detailed info..."
            />
            {formik.touched.longDesc && formik.errors.longDesc ? (
                <p className="text-red-500">{formik.errors.longDesc}</p>
            ) : null}


            <Button type="submit" className="w-full" disabled={uploading || !formik.isValid}>
                {uploading ? "Uploading..." : "Add Pet"}
            </Button>
        </form>
    );
};

export default AddPet;