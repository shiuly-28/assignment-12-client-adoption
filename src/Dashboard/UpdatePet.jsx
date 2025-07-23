import React, { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";

const categories = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "rabbit", label: "Rabbit" },
    { value: "bird", label: "Bird" },
];

const UpdatePet = () => {
    const { id } = useParams();
    const { register, handleSubmit, control, reset, setValue } = useForm();
    const [imagePreview, setImagePreview] = useState("");
    const [imageFile, setImageFile] = useState(null);

    // ✅ Fetch pet data
    useEffect(() => {
        axios.get(`http://localhost:5000/pets/${id}`).then((res) => {
            const pet = res.data;

            reset({
                name: pet.name,
                age: pet.age,
                shortDesc: pet.shortDesc,
                category: categories.find((c) => c.value === pet.category),
            });

            setValue("longDesc", pet.longDesc);
            setImagePreview(pet.image);
        });
    }, [id, reset, setValue]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // ✅ Submit updated data
    const onSubmit = async (data) => {
        try {
            let imageUrl = imagePreview;

            // If a new image is selected, you can upload it (if needed)
            if (imageFile) {
                // Here: upload to image host or server (for now assume imagePreview holds URL)
                // const uploadedImageUrl = await uploadImageToServer(imageFile);
                // imageUrl = uploadedImageUrl;
            }

            const updatedPet = {
                name: data.name,
                age: parseInt(data.age),
                shortDesc: data.shortDesc,
                longDesc: data.longDesc,
                category: data.category?.value || data.category,
                image: imageUrl,
            };

            await axios.put(`http://localhost:5000/pets/${id}`, updatedPet);

            Swal.fire({
                icon: "success",
                title: "Updated!",
                text: "Pet information updated successfully!",
            });
        } catch (error) {
            console.error("PUT error:", error.response?.data || error.message);
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Something went wrong while updating.",
            });
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 shadow rounded my-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Update Pet</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* ✅ Image preview */}
                {imagePreview && (
                    <div className="w-32 h-32 mb-2">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="object-cover w-full h-full rounded"
                        />
                    </div>
                )}

                {/* ✅ Upload new image */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input file-input-bordered w-full"
                />

                <Input placeholder="Pet Name" {...register("name")} />
                <Input type="number" placeholder="Age" {...register("age")} />
                <Input placeholder="Short Description" {...register("shortDesc")} />

                <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                        <Select {...field} options={categories} placeholder="Select Category" />
                    )}
                />

                <Controller
                    name="longDesc"
                    control={control}
                    render={({ field }) => (
                        <ReactQuill {...field} theme="snow" placeholder="Long Description" />
                    )}
                />

                <Button type="submit" variant="default" className="w-full">
                    Update Pet
                </Button>
            </form>
        </div>
    );
};

export default UpdatePet;
