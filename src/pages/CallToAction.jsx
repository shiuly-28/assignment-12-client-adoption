import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const callToActionData = [
    {
        title: "Adoption Begins with Compassion",
        description:
            "A simple moment—a glance between hopeful eyes and a hug—can start the beginning of something life-changing. Through adoption, we bring love, care, and shelter to pets who truly deserve a second chance. Make a difference today by opening your heart and home.",
        image: "https://i.ibb.co/6cbcmPbS/download.jpg",
    },
    {
        title: "More Than a Pet — A Bond for Life",
        description:
            "Pets aren't just companions; they're family. When you adopt, you gain not just a friend, but a lifelong bond. Each wag, purr, and nuzzle reminds us that love doesn't speak one language — it just needs a little kindness and a home.",
        image: "https://i.ibb.co/JwkdFjmb/images.jpg",
    },
    {
        title: "Don't Shop. Adopt Hope.",
        description:
            "Millions of pets are waiting in shelters. Some have faced trauma, some are abandoned, but all are full of hope. Don’t buy when you can adopt and give hope a home. Join our movement to change lives — one adoption at a time.",
        image: "https://i.ibb.co/XZpFrgVm/images.jpg",
    },
];

const CallToAction = () => {
    return (
        <section className="my-12 px-4 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Every Pet Deserves a Home</h2>

            <div className="space-y-6">
                {callToActionData.map((item, index) => (
                    <Card
                        key={index}
                        className={`flex flex-col md:flex-row overflow-hidden border shadow-sm ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                            }`}
                    >
                        <div className="md:w-1/3 w-full h-full">
                            <img src={item.image} alt={item.title} className="object-cover w-full" />
                        </div>
                        <div className="flex-1 p-6">
                            <CardHeader className="p-0 mb-2">
                                <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 text-muted-foreground">
                                <p>{item.description}</p>
                            </CardContent>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default CallToAction;
