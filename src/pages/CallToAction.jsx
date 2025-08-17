import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

const callToActionData = [
    {
        title: "Adoption Begins with Compassion",
        description:
            "A simple moment — a glance between two people and a dog — can be the beginning of something life-changing. That gentle nudge of a nose, that hopeful look from behind the fence, speaks of days spent waiting for someone to care. Compassion is what turns that moment into a new beginning. When you choose to adopt, you're giving more than shelter. You're giving warmth, attention, laughter, late-night walks, and quiet cuddles. You're saying, “You matter.” And in return, you receive a kind of loyalty and love that’s pure, uncomplicated, and endlessly thankful. Compassion doesn’t end at the shelter door — it comes home with you, wagging its tail and forever grateful",
        image: "https://i.ibb.co/6cbcmPbS/download.jpg",
    },
    {
        title: "More Than a Pet — A Bond for Life",
        description:
            "The soft rustle of fur against your shirt, the warmth of a quiet purr — these aren’t just small comforts. They’re the signs of a bond forming that words can’t fully describe. When you adopt a pet, you’re not just bringing an animal into your home — you’re opening your life to a companion who listens in silence, comforts without judgment, and remains by your side through every season. That rescued cat you hold in your arms may have come from uncertainty, but in your embrace, it finds peace, safety, and belonging. This is more than ownership. It’s partnership. It’s the promise that no matter what life brings, you won’t have to face it alone — because now you have each other.",
        image: "https://i.ibb.co/JwkdFjmb/images.jpg",
    },

];

const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.6,
            ease: "easeOut",
        },
    }),
};

const CallToAction = () => {
    return (
        <section className="my-12 px-4 max-w-7xl  w-11/12 mx-auto ">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold text-center mb-10"
            >
                Every Pet Deserves a Home
            </motion.h2>

            <div className="space-y-6">
                {callToActionData.map((item, index) => (
                    <motion.div
                        key={index}
                        custom={index}
                        initial="hidden"
                        whileInView="visible"
                        whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeInUp}
                        className="rounded-xl"
                    >
                        <Card
                            className={`flex flex-col md:flex-row  transform hover:scale-[1.03] cursor-pointer hover:bg-primary/10 hover:shadow-[0_0_20px_3px_lime] transition duration-300 ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            <div className="md:w-1/3 w-full h-full">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="object-cover w-full p-5 h-full "
                                />
                            </div>
                            <div className="flex-1 p-6">
                                <CardHeader className="p-0 mb-2">
                                    <CardTitle className="text-xl font-semibold">
                                        {item.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 text-muted-foreground">
                                    <p>{item.description}</p>
                                </CardContent>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default CallToAction;
