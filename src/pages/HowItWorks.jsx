import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { PawPrint, Info, Phone, Home } from "lucide-react";

const steps = [
    {
        icon: <PawPrint className="w-8 h-8 text-primary" />,
        title: "Browse Pets",
        description: "Explore hundreds of pets by category or location to find your perfect companion.",
    },
    {
        icon: <Info className="w-8 h-8 text-primary" />,
        title: "View Details",
        description: "Click on a pet to learn more about their personality, needs, and background.",
    },
    {
        icon: <Phone className="w-8 h-8 text-primary" />,
        title: "Contact Shelter",
        description: "Get in touch with the shelter or pet owner to ask questions and plan a visit.",
    },
    {
        icon: <Home className="w-8 h-8 text-primary" />,
        title: "Adopt & Welcome Home",
        description: "Complete the adoption and bring home your new best friend!",
    },
];

const HowItWorks = () => {
    return (
        <section className="my-20 px-4 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
                How It Works
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {steps.map((step, index) => (
                    <Card key={index} className="bg-muted/40 hover:shadow-md transition">
                        <CardHeader className="flex items-center gap-3">
                            {step.icon}
                            <CardTitle className="text-lg">{step.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground text-sm">
                            {step.description}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
