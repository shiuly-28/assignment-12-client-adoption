import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // সাধারণ ইমেইল ভ্যালিডেশন চেক
        if (email.trim() && email.includes('@')) {
            setIsError(false);
            setMessage('Thank you for subscribing!');
            setEmail('');
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Thank you for subscribing!",
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            setIsError(true);
            setMessage('Please enter a valid email address');
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Please enter a valid email",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <section className="py-20 bg-gradient-to-br from-green-50 via-white to-emerald-100 dark:from-zinc-900 dark:to-zinc-950 transition-colors duration-500">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-zinc-800 dark:text-zinc-100 tracking-tight">
                    Subscribe to Our Newsletter
                </h2>
                <p className="max-w-2xl mx-auto mb-10 text-zinc-600 dark:text-zinc-400 text-base md:text-lg">
                    Stay updated with the latest adoption campaigns, pet care tips, and special offers.
                </p>

                {/* মডার্ন শ্যাডো এবং হালকা ব্যাকড্রপ ব্লারসহ কার্ড */}
                <Card className="max-w-2xl mx-auto backdrop-blur-sm bg-white/80 dark:bg-zinc-900/80 shadow-xl border border-zinc-100 dark:border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                    <CardContent className="p-8">
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                            <Input
                                type="email"
                                placeholder="Enter your email address"
                                className="w-full sm:flex-1 h-12 px-4 rounded-xl border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-0 transition-all duration-300"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <Button 
                                type="submit" 
                                className="w-full sm:w-auto h-12 bg-green-600 hover:bg-green-700 text-white font-medium px-8 rounded-xl shadow-lg shadow-green-600/20 transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                                Subscribe
                            </Button>
                        </form>
                        
                        {/* সাকসেস বা ইরর মেসেজ দেখানোর সুন্দর জায়গা */}
                        {message && (
                            <p className={`text-sm font-medium mt-4 transition-all duration-300 ${
                                isError ? "text-red-500 dark:text-red-400" : "text-green-600 dark:text-green-400"
                            }`}>
                                {message}
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default Newsletter;