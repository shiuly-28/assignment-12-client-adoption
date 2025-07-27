// impimport React, { useContext, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import registerLotte from '../assets/register.json';
// import Lottie from "lottie-react";
// import { toast } from 'react-toastify';
// import { AuthContext } from "../context/AuthContext";
// import useAxios from "../hooks/useAxios";
// import { updateProfile } from "firebase/auth";
// import useUserRole from '../hooks/userUseRole';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import useAxiosSecure from '../hooks/useAxiosSecure';

// const Register = () => {
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const { refetch } = useUserRole()
//     console.log(errors);
//     const location = useLocation();
//     const navigate = useNavigate();
//     const axiosInstance = useAxios();
//     const { createUser, updateUserProfile } = useContext(AuthContext);
//     const from = location.state?.from || '/';
//     const [profilePic, setProfilePic] = useState('');



//     // Form Submission
//     const onSubmit = async (data) => {
//         console.log(data);
//         try {
//             const result = await createUser(data.email, data.password);
//             const user = result.user;

//             await updateProfile(user, {
//                 displayName: data.name,
//                 photoURL: data.photo
//             });

//             const userinfo = {
//                 name: data.name,
//                 email: data.email,
//                 photo: data.photo,
//                 role: 'user',
//                 create_at: new Date().toISOString(),
//                 last_log_in: new Date().toISOString()
//             };

//             const userRes = await axiosInstance.post('/users', userinfo);
//             console.log(userRes.data);
//             refetch()

//             if (userRes.data.inserted) {
//                 Swal.fire({
//                     position: "top-end",
//                     icon: "success",
//                     title: "Register successfully",
//                     showConfirmButton: false,
//                     timer: 1500
//                 });
//             } else if (userRes.data.updated) {
//                 toast.info("Welcome back! Last login time updated.");
//             }

//             navigate(from);
//         } catch (error) {
//             console.error("Register error:", error.message);
//             toast.error(error.message);
//         }
//     };

//     const handleImageUpload = async (e) => {
//         const image = e.target.files[0];
//         console.log(image);
//         const formData = new FormData();
//         formData.append('image', image);
//         const imagUploadUrl = (`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`)

//         const res = await axios.post(imagUploadUrl, formData)

//         setProfilePic(res.data.data.url);
//     }

//     return (
//         <div className="mt-5 p-5 flex items-center justify-center flex-col md:flex-row gap-5">
//             <div className="w-full md:w-1/2">
//                 <Lottie animationData={registerLotte} loop className="w-full max-w-sm mx-auto" />
//             </div>
//             <Card className="w-full max-w-sm p-4">
//                 <CardHeader>
//                     <CardTitle className="text-center text-2xl font-bold">Please Register</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                         {/* name field */}
//                         <div>
//                             <Label htmlFor="name">Photo</Label>
//                             <input id="name" type="file"
//                                 onChange={handleImageUpload}
//                                 className='rounded-3xl border p-2 w-full' placeholder="Your Profile Picture" />

//                         </div>
//                         {/* name field */}
//                         <div>
//                             <Label htmlFor="name">Name</Label>
//                             <input id="name" type="text" className='rounded-3xl border p-2 w-full' placeholder="Enter your name" {...register("name", { required: true })} />
//                         </div>

//                         {/* name field */}
//                         <div>
//                             <Label htmlFor="email">Email</Label>
//                             <input id="email" type="email" className='rounded-3xl border p-2 w-full' placeholder="Enter your email" {...register("email", { required: true })} />
//                         </div>

//                         {/* password field */}
//                         <div>
//                             <Label htmlFor="password">Password</Label>
//                             <input id="password" type="password" className='rounded-3xl border p-2 w-full' placeholder="Enter your password" {...register("password", { required: true })} />
//                         </div>
//                         <Button type="submit" className="w-full">Register</Button>


//                         <p className='text-sm text-center'>
//                             Already have an account?{" "}
//                             <Link to="/login" className="text-blue-600 hover:underline font-medium">
//                                 Login here
//                             </Link>
//                         </p>
//                     </form>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };

// export default Register;
