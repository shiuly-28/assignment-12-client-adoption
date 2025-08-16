import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

const reviews = [
    {
        id: 1,
        name: "Sarah Johnson",
        feedback: "Adopting my cat from here was the best decision ever! The process was smooth and the staff were really supportive.",
        image: "https://i.pravatar.cc/150?img=12",
        rating: 5,
    },
    {
        id: 2,
        name: "Michael Smith",
        feedback: "I adopted a lovely golden retriever. The platform made everything easy and transparent.",
        image: "https://i.pravatar.cc/150?img=5",
        rating: 4,
    },
    {
        id: 3,
        name: "Emily Davis",
        feedback: "Great initiative! It feels amazing to give a pet a forever home.",
        image: "https://i.pravatar.cc/150?img=8",
        rating: 5,
    },
];

const Reviews = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-10">What Our Adopters Say</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {reviews.map((review) => (
                        <Card key={review.id} className="shadow-md rounded-2xl">
                            <CardHeader>
                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-16 h-16 rounded-full mx-auto mb-3"
                                />
                                <CardTitle className="text-lg">{review.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 mb-4">{review.feedback}</p>
                                <div className="flex justify-center gap-1">
                                    {Array.from({ length: review.rating }).map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
