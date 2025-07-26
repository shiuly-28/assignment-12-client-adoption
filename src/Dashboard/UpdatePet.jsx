import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const UpdatePet = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [imageURL, setImageURL] = useState(""); // For preview

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm();

    const watchedImage = watch("image");

    // Set preview on change
    useEffect(() => {
        if (watchedImage) {
            setImageURL(watchedImage);
        }
    }, [watchedImage]);

    // Fetch existing pet data
    useEffect(() => {
        const fetchPet = async () => {
            try {
                const res = await axiosSecure.get(`/pets/${id}`);
                const pet = res.data;

                setValue("name", pet.name);
                setValue("location", pet.location);
                setValue("shortDescription", pet.shortDescription);
                setValue("longDescription", pet.longDescription);
                setValue("image", pet.image);
                setImageURL(pet.image); // Set image preview
            } catch (error) {
                console.error("Failed to fetch pet:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load pet data.",
                });
            }
        };

        fetchPet();
    }, [axiosSecure, id, setValue]);

    // Submit handler
    const onSubmit = async (data) => {
        try {
            const res = await axiosSecure.put(`/pets/${id}`, data);
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: "Pet information updated successfully",
                });
                navigate("/dashboard/all-pets");
            } else {
                Swal.fire({
                    icon: "info",
                    title: "No Changes",
                    text: "No changes were made to the pet info.",
                });
            }
        } catch (error) {
            console.error("Full error object:", error);
            const message =
                error.response?.data?.message ||
                error.response?.data ||
                error.message ||
                "Something went wrong. Please try again.";
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: message,
            });
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow-md my-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Update Pet Info</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    {/* ✅ Preview */}
                    {imageURL && (
                        <div className="mt-2">
                            <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
                            <img
                                src={imageURL}
                                alt="Pet Preview"
                                className="w-48 h-48 object-cover rounded border"
                            />
                        </div>
                    )}
                    <label className="block mb-1">Pet Name</label>
                    <input
                        type="text"
                        {...register("name", { required: true })}
                        className="w-full border p-2 rounded"
                    />
                    {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
                </div>

                <div>
                    <label className="block mb-1">Location</label>
                    <input
                        type="text"
                        {...register("location", { required: true })}
                        className="w-full border p-2 rounded"
                    />
                    {errors.location && <p className="text-red-500 text-sm">Location is required</p>}
                </div>

                <div>
                    <label className="block mb-1">Short Description</label>

                    <input
                        type="text"
                        {...register("shortDescription", { required: true })}
                        className="w-full border p-2 rounded"
                    />
                    {errors.shortDescription && (
                        <p className="text-red-500 text-sm">Short description is required</p>
                    )}
                </div>

                <div>
                    <label className="block mb-1">Long Description</label>
                    <textarea
                        {...register("longDescription", { required: true })}
                        className="w-full border p-2 rounded"
                    ></textarea>
                    {errors.longDescription && (
                        <p className="text-red-500 text-sm">Long description is required</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 w-full text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Update Pet
                </button>
            </form>
        </div>
    );
};

export default UpdatePet;
