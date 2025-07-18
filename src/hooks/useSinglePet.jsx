// src/hooks/useSinglePet.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const useSinglePet = (id) => {
    const [pet, setPet] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/api/pets/${id}`)
                .then(res => setPet(res.data))
                .catch(err => console.error(err));
        }
    }, [id]);

    return [pet];
};

export default useSinglePet;
