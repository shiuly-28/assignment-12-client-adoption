
import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';


const api = axios.create({
    baseURL: `http://localhost:5000`
})

const useAxiosSecure = () => {
    const { user } = useAuth();

    api.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user.accessToken}`
        return config;
    }, error => {
        return Promise.reject(error);
    })
    return api;
};

export default useAxiosSecure;