import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://assignment-12-server-adopton-hdx0s7emq-sheauly-s-projects.vercel.app`
})


const useAxios = () => {
    return axiosInstance
};

export default useAxios;