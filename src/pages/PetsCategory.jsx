import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCat, FaDog, FaFish, FaCrow, FaCarrot } from "react-icons/fa";

const petCategories = [
    { name: "Cat", icon: <FaCat size={28} className="text-green-600" />, color: "bg-green-200" },
    { name: "Dog", icon: <FaDog size={28} className="text-blue-600" />, color: "bg-green-200" },
    { name: "Rabbit", icon: <FaCarrot size={28} className="text-orange-600" />, color: "bg-green-200" },
    { name: "Fish", icon: <FaFish size={28} className="text-indigo-600" />, color: "bg-green-200" },
    { name: "Bird", icon: <FaCrow size={28} className="text-purple-600" />, color: "bg-green-200" },
    { name: "others", icon: <FaCrow size={28} className="text-purple-600" />, color: "bg-green-200" },
];

const PetsCategory = () => {
    return (
        <section className="my-12 px-4 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
                Explore Pet Categories
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {petCategories.map((cat, index) => (
                    <motion.div
                        key={cat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        whileHover={{ scale: 1.05 }}
                        className={`${cat.color} rounded-xl p-5 flex items-center h-35 gap-4 shadow cursor-pointer hover:bg-amber-200 hover:shadow-[0_0_30px_3px_lime] transition duration-300`}
                    >
                        {/* Icon circle */}
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow">
                            {cat.icon}
                        </div>

                        {/* Name */}
                        <span className="text-lg font-semibold text-gray-800">
                            {cat.name}
                        </span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default PetsCategory;
