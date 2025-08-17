import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setMessage('Thank you for subscribing ');
            setEmail('');
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Thank you for subscribing!",
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            setMessage('Please enter a valid email');
            Swal.fire({
                position: "top-end",
                icon: "error",   // ✅ এখানে success না দিয়ে error হবে
                title: "Please enter a valid email",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }



    return (
        <section className="py-16 bg-gradient-to-r">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-center mb-10 text-foreground">
                    Subscribe to Our Newsletter
                </h2>
                <p className=" text-center mb-10 text-foreground">
                    Stay updated with the latest adoption campaigns, pet care tips, and special offers.
                </p>

                <Card className="p-6 shadow-lg rounded-2xl bg-white transition-transform duration-300 hover:scale-105 hover:shadow-xl mt-4">
                    <CardContent>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center justify-center max-w-xl mx-auto gap-4">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="md:flex-1 transition-colors duration-300  focus:ring-2 focus:ring-green-500"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <Button className="bg-green-600 hover:bg-green-700 text-white px-6 transition-transform duration-300 hover:scale-110">
                                    Subscribe
                                </Button>
                            </form>
                            {message && <p className="text-center mt-4">{message}</p>}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default Newsletter;
