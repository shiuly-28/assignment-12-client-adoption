import React from 'react';
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button"

const categories = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "rabbit", label: "Rabbit" },
    { value: "bird", label: "Bird" },
];
const UpdatePet = () => {
    const { id } = useParams();
    const { register, handleSubmit, control, reset, setValue } = useForm();


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
        });
    }, [id, reset, setValue]);



    const onSubmit = async (data) => {
        try {
            const updatedPet = {
                name: data.name,
                age: parseInt(data.age),
                shortDesc: data.shortDesc,
                longDesc: data.longDesc,
                category: data.category?.value || data.category,
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
            <h2 className="text-2xl font-bold mb-6 text-center">Edit Pet</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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