import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { HeartHandshake, Globe, Users } from "lucide-react";

const reasons = [
    {
        image: "https://i.ibb.co/Wv7g3NPG/download.jpg",
        icon: <HeartHandshake className="w-5 h-5 text-primary" />,
        title: "Save a Life",
        description: "Each adoption helps a pet avoid a life in a shelter or worse — abandonment.",
    },
    {
        image: "https://i.ibb.co/3yt711nW/images.jpg",
        icon: <Globe className="w-5 h-5 text-primary" />,
        title: "Reduce Homelessness",
        description: "Adopting lowers the number of stray animals and promotes responsible care.",
    },
    {
        image: "https://i.ibb.co/ycsZScjB/images.jpg",
        icon: <Users className="w-5 h-5 text-primary" />,
        title: "Lifelong Bond",
        description: "Adopted pets form deep, grateful bonds with their new families.",
    },
];

const WhyAdopt = () => {
    return (
        <section className="my-16 px-4 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10 text-foreground">Why Adopt?</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 shadow-md hover:shadow-lime-600 transition duration-300">
                {reasons.map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                        <Card className="hover:shadow-md transition overflow-hidden">
                            {/* Image */}
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-48 object-cover"
                            />

                            {/* Title & Icon */}
                            <CardHeader className="flex items-center gap-2">
                                {item.icon}
                                <CardTitle className="text-lg">{item.title}</CardTitle>
                            </CardHeader>

                            {/* Description */}
                            <CardContent className="text-muted-foreground text-sm">
                                {item.description}
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default WhyAdopt;
