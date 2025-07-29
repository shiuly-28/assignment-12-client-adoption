// src/hooks/useSinglePet.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import useAxios from "./useAxios";

const useSinglePet = (id) => {
    const [pet, setPet] = useState(null);
    const axios = useAxios();

    useEffect(() => {
        if (id) {
            axios.get(`/api/pets/${id}`)
                .then(res => setPet(res.data))
                .catch(err => console.error(err));
        }
    }, [id]);

    return [pet];
};

export default useSinglePet;
