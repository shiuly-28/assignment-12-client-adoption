import axios from "axios";

const handleAdopt = async (data, reset) => {
    try {
        await axios.post("http://localhost:5000/adoptions", data);
        alert("Adoption request submitted successfully!");
        reset();
    } catch (error) {
        console.error("Adoption error", error);
        alert("Something went wrong.");
    }
};

export default handleAdopt;
