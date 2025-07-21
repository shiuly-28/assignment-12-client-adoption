import { useEffect, useState } from "react";
import axios from "axios";

const useAdmin = (email) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!email) {
            setIsAdmin(false);
            setLoading(false);
            return;
        }

        axios.get(`http://localhost:5000/users/admin/${email}`)
            .then(res => {
                setIsAdmin(res.data.isAdmin);
            })
            .catch(() => {
                setIsAdmin(false);
            })
            .finally(() => setLoading(false));
    }, [email]);

    return [isAdmin, loading];
};

export default useAdmin;
