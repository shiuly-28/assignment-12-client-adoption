import { Card, CardHeader, CardContent } from "@/components/ui/card";

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
];

const Testimonials = () => {
    return (
        <section className="my-20 px-4 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10 text-foreground">Happy Adoption Stories</h2>
            <div className="grid md:grid-cols-2 gap-6">
                {testimonials.map((t, i) => (
                    <Card key={i} className="p-4 bg-muted/40">
                        <CardHeader className="flex items-center gap-4">
                            <img src={t.photo} alt={t.name} className="w-14 h-14 rounded-full object-cover border" />
                            <h4 className="text-lg font-semibold">{t.name}</h4>
                        </CardHeader>
                        <CardContent className="text-muted-foreground text-sm mt-2">
                            <p>{t.text}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
