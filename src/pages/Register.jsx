
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
// import { auth } from '../firebase/firebase.init';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import registerLotte from '../assets/register.json';
import Lottie from "lottie-react";
import { toast } from 'react-toastify';

import { AuthContext } from "../context/AuthContext";

const Register = () => {
    const { register, handleSubmit, } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    // const { signIn } = useAuth();
    const from = location.state?.from || '/';
    const { createUser, googleSignIn } = useContext(AuthContext);

    const onSumbmit = (data) => {
        createUser(data.email, data.password)
            .then((result) => {
                console.log("Register success:", result.user);
                navigate(from);
            })
            .catch((error) => {
                console.error("Register error:", error.message);
            });


    };

    // password validation
    // const hasUppercase = /[A-Z]/.test(password);
    // const hasLowercase = /[a-z]/.test(password);
    // const hasMinLength = password.length >= 6;

    // if (!hasUppercase || !hasLowercase || !hasMinLength) {
    //     toast.error("Password must have uppercase, lowercase & at least 6 characters");
    //     return;
    // }

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(() => {
                toast.success("Google Registration successful!");
                navigate("/");
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };
    return (
        <div className="mt-5 p-5 flex items-center justify-center ">
            <div className="w-full md:w-1/2">
                <Lottie animationData={registerLotte} loop className="w-full max-w-sm mx-auto" />
            </div>
            <Card className="w-full max-w-sm p-4">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">Please Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSumbmit)} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" type="name" placeholder="Enter your name" {...register("name", { required: true })} />
                        </div>

                        {/* Photo */}
                        <div>
                            <Label htmlFor="photo">Photo URL</Label>
                            <Input id="photo" type="photo" placeholder="Enter your name" {...register("photo", { required: true })} />
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Enter your email" {...register("email", { required: true })} />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="Enter your password" {...register("password", { required: true })} />
                        </div>
                        <Button type="submit" className="w-full">Register</Button>

                        {/* Google Sign In */}
                        <Button
                            variant="outline"
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center rounded-3xl gap-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white p-2"
                        >
                            <svg
                                aria-label="Google logo"
                                width="16"
                                height="16"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <g>
                                    <path d="m0 0H512V512H0" fill="#fff"></path>
                                    <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                                    <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                                    <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                                    <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                                </g>
                            </svg>
                            Register with Google
                        </Button>

                        {/* Login Link */}
                        <p className=''>
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