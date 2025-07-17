import { Link } from "react-router-dom";

const petCategories = [
    {
        name: "Cats",
        image: "https://i.ibb.co/dsJ3dFSw/images-2.jpg",
        path: "/category/cats",
    },
    {
        name: "Dogs",
        image: "https://i.ibb.co/LhHPkXWG/Most-Energetic-Dog-Breeds.webp",
        path: "/category/dogs",
    },
    {
        name: "Rabbits",
        image: "https://i.ibb.co/pry66spB/images.jpg",
        path: "/category/rabbits",
    },
    {
        name: "Fish",
        image: "https://i.ibb.co/tM5tkT2Q/download.jpg",
        path: "/category/fish",
    },
    {
        name: "Birds",
        image: "https://i.ibb.co/B2VsckCR/images.jpg",
        path: "/category/birds",
    },
    {
        name: "Others",
        image: "https://i.ibb.co/4gZ0Kg32/images.jpg",
        path: "/category/others",
    },
];

const PetsCategory = () => {
    return (
        <section className="my-12 px-4 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Explore Pet Categories</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {petCategories.map((cat) => (
                    <Link
                        key={cat.name}
                        to={cat.path}
                        className="rounded-xl overflow-hidden shadow hover:shadow-lg transition border border-gray-200 hover:border-primary"
                    >
                        <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-36 object-cover"
                        />
                        <div className="p-3 text-center font-medium text-lg bg-background text-foreground">
                            {cat.name}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default PetsCategory;
