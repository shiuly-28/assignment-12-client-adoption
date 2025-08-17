import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SalesPromotion = () => {
    const campaigns = [
        {
            id: 1,
            title: "50% Off on Selected Items",
            desc: "Enjoy half price on your favorite meals this weekend only!",
            img: "https://i.ibb.co.com/Cp62zz0c/images-5.jpg",
        },
        {
            id: 2,
            title: "Buy 1 Get 1 Free",
            desc: "Order any pizza and get another one free. Limited time offer!",
            img: "https://i.ibb.co.com/6c8C9ymw/download-2.jpg",
        },
        {
            id: 3,
            title: "Family Combo Pack",
            desc: "Special combo meals for families with amazing discounts.",
            img: "https://i.ibb.co.com/x8fM4833/images-4.jpg",
        },
        {
            id: 4,
            title: "Weekend Special",
            desc: "Exclusive weekend meals with 30% discount on all burgers.",
            img: "https://i.ibb.co.com/4RTgRQ5P/download-3.jpg",
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="text-block py-20 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold"
                >
                    Special Sales & Promotions 🎉
                </motion.h1>
                <p className="mt-4 text-lg max-w-2xl mx-auto">
                    Don’t miss out on our limited-time offers! Grab your favorite meals
                    at amazing discounts.
                </p>
            </div>

            {/* Campaigns Section */}
            <div className="container mx-auto py-12 px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {campaigns.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <Card className="rounded-xl shadow-lg overflow-hidden hover:shadow-[0_0_20px_3px_lime] transition duration-300">
                                {/* Image hover effect */}
                                <motion.img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-56 object-cover"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.4 }}
                                />

                                <CardContent className="flex flex-col flex-grow">
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
                                </CardContent>

                                <CardFooter className="flex justify-end">
                                    <motion.div whileHover={{ scale: 1.1 }}>
                                        <Link to={`/campaginDetails/${item.id}`}>
                                            <Button variant="default" size="sm">
                                                See More
                                            </Button>
                                        </Link>
                                    </motion.div>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SalesPromotion;
