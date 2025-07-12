// src/pages/Login.jsx

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase.init";
import loginLottie from '../assets/login.json';
import Lottie from "lottie-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const { register, handleSubmit, } = useForm();
    const { signInWithGoogle } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    // const { signIn } = useAuth();
    const from = location.state?.from || '/';

    const onSumbmit = (data) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((result) => {
                console.log("Login success:", result.user);
                navigate(from);
            })
            .catch((error) => {
                console.error("Login error:", error.message);
            });

    };
    const handleGooglogin = () => {
        signInWithGoogle()
            .then((result) => {
                console.log(result);
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="mt-5 p-5 flex items-center justify-center ">
            {/* Lottie Animation */}
            <div className="w-full lg:w-1/2 flex justify-center">
                <Lottie className="max-w-xs sm:max-w-md md:max-w-lg" animationData={loginLottie} />
            </div>
            <Card className="w-full max-w-sm p-4">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">Please Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSumbmit)} className="space-y-4">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" className="rounded-3xl mt-3" placeholder="Enter your email" {...register("email", { required: true })} />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" className="rounded-3xl mt-3" type="password" placeholder="Enter your password" {...register("password", { required: true })} />
                        </div>
                        <Button type="submit" className="w-full rounded-3xl">Login</Button>

                        {/* Google Login */}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleGooglogin}
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

                        {/* Register Link */}
                        <p>
                            Don't have an account?{' '}
                            <Link to="/register" className="text-green-700 font-medium">
                                Register
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login
