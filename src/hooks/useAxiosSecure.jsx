
import axios from 'axios';
import React from 'react';


const api = axios.create({
    baseURL: `http://localhost:5000`
})

const useAxiosSecure = () => {
    return api;
};

export default useAxiosSecure;