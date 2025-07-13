// src/utils/handleAdopt.js
import axios from "axios";


const handleAdopt = async (data, reset) => {
    try {
        const res = await axios.post("http://localhost:5000/api/adoptions", data);
        if (res.status === 201) {
            alert("Adoption request submitted successfully!");
            reset(); // form reset
        } else {
            alert("Something went wrong. Please try again.");
        }
    } catch (error) {
        console.error("Adoption request failed:", error);
        alert("Failed to submit adoption request.");
    }
};

export default handleAdopt;
