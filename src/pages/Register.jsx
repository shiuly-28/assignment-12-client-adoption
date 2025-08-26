import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import Lottie from 'lottie-react';
import animationData from '../assets/register.json';


import Swal from 'sweetalert2';
// import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { FaUserCircle } from 'react-icons/fa';

// import { Helmet } from 'react-helmet-async';
import useAxios from '../hooks/useAxios';
import useAuth from '../hooks/useAuth';



const Register = () => {
    const { register: authRegister, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axios = useAxios();
    const [profilePic, setProfilePic] = useState('');
    const [uploading, setUploading] = useState(false);

    const from = location.state?.from?.pathname || '/';

    const handleImageUpload = (e) => {
        const image = e.target.files[0];
        if (!image) return;

        const formData = new FormData();
        formData.append('image', image);
        setUploading(true);

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`;

        axios.post(imageUploadUrl, formData)
            .then(res => {
                setProfilePic(res.data.data.url);
            })
            .catch(err => {
                console.error("Image Upload Failed:", err);
                Swal.fire('Error', 'Image upload failed. Try again.', 'error');
            })
            .finally(() => {
                setUploading(false);
            });
    };


    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(() => {
                return updateUserProfile({
                    displayName: data.name,
                    photoURL: profilePic
                });
            })
            .then(() => {
                const userInfo = {
                    name: data.name,
                    email: data.email,
                    image: profilePic,
                    role: 'user',
                    createdAt: new Date().toISOString(),
                    isSubscribed: false
                };

                return axios.post('/users', userInfo);
            })
            .then(() => {
                Swal.fire('Success!', 'Account created successfully!', 'success')
                    .then(() => navigate(from, { replace: true }));
            })
            .catch((error) => {
                console.error("Register Error:", error);
                Swal.fire('Error', 'Registration failed. Try again.', 'error');
            });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center min-h-screen py-10">
            {/* <Helmet>
                <title>Register | AppOrbit</title>
                <meta name="description" content="Welcome to AppOrbit - Discover top tech products." />
            </Helmet> */}
            {/* Form Section */}
            <div className="bg-gray-200 p-8 rounded-xl shadow-lg hover:shadow-amber-600  text-white w-full max-w-md mx-auto cursor-pointer hover:bg-primary/10 hover:shadow-[0_0_20px_3px_lime] transition duration-300">
                <h2 className="text-2xl font-bold mb-6 text-amber-600 text-center">Create Your AdoptDonation Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Profile Upload */}
                    <div className="flex justify-center mb-4">
                        <label
                            htmlFor="profilePic"
                            className="cursor-pointer relative w-18 h-18 md:w-24 md:h-24 rounded-full border-4 border-amber-600 flex items-center justify-center overflow-hidden"
                            title="Upload Profile Picture"
                        >
                            {profilePic ? (
                                <img
                                    src={profilePic}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            ) : (
                                <FaUserCircle className="text-6xl text-gray-400" />
                            )}
                            <input
                                id="profilePic"
                                type="file"
                                onChange={handleImageUpload}
                                className="hidden"
                                accept="image/*"
                            />
                        </label>
                    </div>
                    {uploading && <p className="text-center text-sm text-amber-600">Uploading image...</p>}

                    {/* Name */}
                    <div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            {...authRegister("name", { required: "Name is required" })}
                            className="w-full px-4 py-3 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                        />
                        {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            placeholder="Email Address"
                            {...authRegister("email", { required: "Email is required" })}
                            className="w-full px-4 py-3 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                        />
                        {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            {...authRegister("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Minimum 6 characters required" }
                            })}
                            className="w-full px-4 py-3 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                        />
                        {errors.password && <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={uploading}
                        className="w-full py-3 bg-amber-600 hover:bg-orange-800 rounded-md text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {uploading ? 'Uploading Image...' : 'Register'}
                    </button>
                </form>

                <p className="text-center text-sm mt-4 text-gray-400">
                    Already have an account?{" "}
                    <Link to="/login" className="text-amber-600 hover:underline">Login</Link>
                </p>

                <div className="divider my-6 text-black font-medium">or</div>

                {/* <SocialLogin /> */}
            </div>

            {/* Lottie Animation */}
            <div className="hidden md:block">
                <Lottie animationData={animationData} loop className="w-150 h-150" />
            </div>
        </div>
    );
};

export default Register;