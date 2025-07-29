import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import { Button } from "@/components/ui/button";
import AdoptModal from "../components/ui/AdoptModal";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import useAxios from "../hooks/useAxios";

const PetDetails = () => {
    const { id } = useParams();
    const user = useAuth();
    const [open, setOpen] = useState(false);
    const axios = useAxios();

    const { data: pet, error, isLoading } = useQuery({
        queryKey: ["pets", id],
        queryFn: async () => {
            const res = await axios.get(`/pets/${id}`);
            return res.data;
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading pet details.</div>;

    return (
        <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img
                        src={pet?.image}
                        alt={pet?.name}
                        className="w-full h-auto object-cover rounded-lg"
                    />
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-4">{pet?.name}</h1>
                    <p className="text-lg mb-2">
                        <span className="font-semibold">Age:</span> {pet?.age} years
                    </p>
                    <p className="text-lg mb-4">
                        <span className="font-semibold">Location:</span> {pet?.location}
                    </p>
                    <p className="text-lg mb-4">
                        <span className="font-semibold">category:</span> {pet?.category}
                    </p>
                    <p className="text-lg mb-4">
                        <span className="font-semibold">
                            longDesc:</span> {pet?.LongDesc}
                    </p>

                    <AdoptModal pet={pet} user={user} />
                </div>
            </div>
        </div>
    );
};

export default PetDetails;
