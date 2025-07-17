import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

const initialTestimonials = [
    {
        name: "Shamima Akter",
        photo: "https://i.ibb.co/gBCmCcY/download.jpg",
        text: "I adopted a cat named Luna from here and she changed my life. The process was easy and the team was supportive throughout!",
    },
    {
        name: "Rahim Uddin",
        photo: "https://i.ibb.co/XxqfyfwZ/images.jpg",
        text: "Thanks to PetAdopt, I found my best friend Max — a playful labrador. Highly recommend adopting instead of buying!",
    },
];

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState(initialTestimonials);

    const handleSwipe = (index, direction) => {
        const updated = testimonials.filter((_, i) => i !== index);
        setTestimonials(updated);
    };

    return (
        <section className="my-20 px-4 max-w-5xl mx-auto">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold text-center mb-10 text-foreground"
            >
                Happy Adoption Stories
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-6">
                <AnimatePresence>
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.name}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={(e, info) => {
                                if (info.offset.x > 150) {
                                    handleSwipe(i, "right");
                                } else if (info.offset.x < -150) {
                                    handleSwipe(i, "left");
                                }
                            }}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.4 }}
                            className="rounded-xl cursor-grab active:cursor-grabbing"
                        >
                            <Card className="p-4 bg-muted/40  hover:shadow-lime-600 transition duration-300">
                                <CardHeader className="flex items-center gap-4  ">
                                    <img
                                        src={t.photo}
                                        alt={t.name}
                                        className="w-14 h-14 rounded-full object-cover border"
                                    />
                                    <h4 className="text-lg font-semibold">{t.name}</h4>
                                </CardHeader>
                                <CardContent className="text-muted-foreground text-sm mt-2">
                                    <p>{t.text}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Testimonials;
