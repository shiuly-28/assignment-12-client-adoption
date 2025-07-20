import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import registerLotte from '../assets/register.json';
import Lottie from "lottie-react";
import { toast } from 'react-toastify';
import { AuthContext } from "../context/AuthContext";
import useAxios from "../hooks/useAxios";
import { updateProfile } from "firebase/auth";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    console.log(errors);
    const location = useLocation();
    const navigate = useNavigate();
    const axiosInstance = useAxios();
    const { createUser, signInWithGoogle } = useContext(AuthContext);
    const from = location.state?.from || '/';

    // Form Submission
    const onSubmit = async (data) => {
        console.log(data);
        try {
            const result = await createUser(data.email, data.password);
            const user = result.user;

            await updateProfile(user, {
                displayName: data.name,
                photoURL: data.photo
            });

            const userinfo = {
                name: data.name,
                email: data.email,
                photo: data.photo,
                role: 'user',
                create_at: new Date().toISOString(),
                last_log_in: new Date().toISOString()
            };

            const userRes = await axiosInstance.post('/users', userinfo);
            console.log(userRes.data);

            if (userRes.data.inserted) {
                toast.success("Registration successful!");
            } else if (userRes.data.updated) {
                toast.info("Welcome back! Last login time updated.");
            }

            navigate(from);
        } catch (error) {
            console.error("Register error:", error.message);
            toast.error(error.message);
        }
    };

    // Google Login Handler
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithGoogle();
            const user = result.user;

            const userinfo = {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                role: 'user',
                create_at: new Date().toISOString(),
                last_log_in: new Date().toISOString()
            };

            const userRes = await axiosInstance.post('/users', userinfo);

            if (userRes.data.inserted) {
                toast.success("Google Registration successful!");
            } else if (userRes.data.updated) {
                toast.info("Welcome back via Google!");
            }

            navigate('/');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="mt-5 p-5 flex items-center justify-center flex-col md:flex-row gap-5">
            <div className="w-full md:w-1/2">
                <Lottie animationData={registerLotte} loop className="w-full max-w-sm mx-auto" />
            </div>
            <Card className="w-full max-w-sm p-4">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">Please Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <input id="name" type="text" className='rounded-3xl border p-2 w-full' placeholder="Enter your name" {...register("name", { required: true })} />
                        </div>
                        <div>
                            <Label htmlFor="photo">Photo URL</Label>
                            <input id="photo" type="url" className='rounded-3xl border p-2 w-full' placeholder="Enter your photo URL" {...register("photo", { required: true })} />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <input id="email" type="email" className='rounded-3xl border p-2 w-full' placeholder="Enter your email" {...register("email", { required: true })} />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <input id="password" type="password" className='rounded-3xl border p-2 w-full' placeholder="Enter your password" {...register("password", { required: true })} />
                        </div>
                        <Button type="submit" className="w-full">Register</Button>

                        {/* Google Sign In */}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center rounded-3xl gap-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white p-2"
                        >
                            {/* Google Logo */}
                            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff" /><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" /><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" /><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" /><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" /></g></svg>
                            Register with Google
                        </Button>

                        <p className='text-sm text-center'>
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-600 hover:underline font-medium">
                                Login here
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Register;
