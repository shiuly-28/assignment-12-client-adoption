// src/pages/Login.jsx

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase.init";

const Login = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();
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
    return (
        <div className="mt-5 p-5 flex items-center justify-center ">
            <Card className="w-full max-w-sm p-4">
                <CardHeader>
                    <CardTitle className="text-center">Please Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSumbmit)} className="space-y-4">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Enter your email" {...register("email", { required: true })} />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="Enter your password" {...register("password", { required: true })} />
                        </div>
                        <Button type="submit" className="w-full">Login</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login
