import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const testimonials = [
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
    {
        name: "Nasrin Sultana",
        photo: "https://i.ibb.co/rSNdJ1P/download.jpg",
        text: "Adopting from PetAdopt was the best decision ever. My kitten Mimi is the most adorable companion!",
    },
    {
        name: "Tanvir Hasan",
        photo: "https://i.ibb.co/CpHxg8jT/images.jpg",
        text: "I never thought adopting a dog could be this easy. PetAdopt guided me through the whole journey!",
    },
];

const Testimonials = () => {
    return (
        <section className="my-20 px-4 max-w-7xl mx-auto overflow-hidden">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold text-center mb-10 text-foreground"
            >
                Happy Adoption Stories
            </motion.h2>

            {/* Marquee Wrapper */}
            <motion.div
                className="flex gap-6 w-max"
                animate={{ x: ["0%", "-100%"] }}
                transition={{
                    repeat: Infinity,
                    duration: 20,
                    ease: "linear",
                }}
            >
                {[...testimonials, ...testimonials].map((t, i) => (
                    <Card
                        key={i}
                        className="min-w-[300px] max-w-sm p-4 bg-muted/40 mx-2 shadow-md cursor-pointer hover:bg-primary/10 hover:shadow-[0_0_10px_3px_lime] transition duration-300"
                    >
                        <CardHeader className="flex items-center gap-4">
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
                ))}
            </motion.div>
        </section>
    );
};

export default Testimonials;
