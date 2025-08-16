import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const api = axios.create({
    baseURL: `https://assignment-12-server-adopton-hdx0s7emq-sheauly-s-projects.vercel.app`,
});

const useAxiosSecure = () => {
    const { user } = useAuth();

    useEffect(() => {
        // Interceptor শুধুমাত্র যখন user.accessToken আছে তখনই add করো
        if (user?.accessToken) {
            const interceptor = api.interceptors.request.use(
                (config) => {
                    config.headers.Authorization = `Bearer ${user.accessToken}`;
                    return config;
                },
                (error) => Promise.reject(error)
            );

            // Cleanup interceptor (যাতে multiple না হয়)
            return () => {
                api.interceptors.request.eject(interceptor);
            };
        }
    }, [user]);

    return api;
};

export default useAxiosSecure;
