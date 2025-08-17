import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Sample campaigns array (same as SalesPromotion)
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

const CampaignDetails = () => {
    const { id } = useParams();
    const campaign = campaigns.find((item) => item.id === parseInt(id));

    if (!campaign) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold">Campaign not found!</h2>
                <Link to="/sales-promotion">
                    <Button className="mt-4">Back to Promotions</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-16 px-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-xl w-full"
            >
                <Card className="rounded-2xl shadow-xl overflow-hidden">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">{campaign.title}</CardTitle>
                    </CardHeader>
                    <img src={campaign.img} alt={campaign.title} className="w-full h-64 object-cover" />
                    <CardContent>
                        <p className="text-gray-700 mt-4">{campaign.desc}</p>
                    </CardContent>

                </Card>
            </motion.div>
        </div>
    );
};

export default CampaignDetails;
