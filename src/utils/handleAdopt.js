// src/utils/handleAdopt.js
// src/utils/handleAdopt.js
import axios from "axios";
import Swal from "sweetalert2";

const handleAdopt = async (data, reset) => {
    try {
        const res = await axios.post("http://localhost:5000/adoptions", data);

        if (res.data?.insertedId) {
            Swal.fire({
                icon: "success",
                title: "Adoption Request Submitted!",
                text: "Thank you for your interest in adopting a pet! 🐾",
                confirmButtonColor: "#22c55e",
                confirmButtonText: "OK"
            });
            reset();
        }
    } catch (error) {
        console.error("Adoption submission failed:", error);
        Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "Something went wrong while submitting your request.",
            confirmButtonColor: "#ef4444"
        });
    }
};

export default handleAdopt;

