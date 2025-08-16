import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaListUl,
    FaPlusCircle,
    FaUserEdit,
    FaHeart,
    FaBookmark,
    FaComments,
    FaSearch,
    FaHome,
} from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const DashBoardHome = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)

    const cards = [
        {
            icon: <FaListUl className="text-3xl text-white" />,
            title: "Pet Listings",
            desc: "View and manage your posts",

            bg: "bg-gradient-to-r from-blue-500 to-blue-700",
        },
        {
            icon: <FaPlusCircle className="text-3xl text-white" />,
            title: "All Donation",
            desc: "Post a new Donation request",
            bg: "bg-gradient-to-r from-green-500 to-green-700",
        },
        {
            icon: <FaUserEdit className="text-3xl text-white" />,
            title: "My Profile",
            desc: "Edit and manage your info",
            bg: "bg-gradient-to-r from-purple-500 to-purple-700",
        },
        {
            icon: <FaHeart className="text-3xl text-white" />,
            title: "Total Likes",
            desc: "People liked your posts",
            bg: "bg-gradient-to-r from-pink-500 to-pink-700",
        },
        {
            icon: <FaBookmark className="text-3xl text-white" />,
            title: "Bookmarked pet",
            desc: "Pets you’ve bookmarked",
            bg: "bg-gradient-to-r from-yellow-400 to-yellow-600",
        },
        {
            icon: <FaComments className="text-3xl text-white" />,
            title: "Messages",
            desc: "Chat with donation",
            bg: "bg-gradient-to-r from-indigo-500 to-indigo-700",
        },

        {
            icon: <FaHome className="text-3xl text-white" />,
            title: "Go Home",
            desc: "Back to main page",
            path: "/",
            bg: "bg-gradient-to-r from-red-500 to-red-700",
        },
    ];

    return (
        <div>
            {/* Profile Image and Basic Info */}
            <div className="max-w-md mx-auto bg-blue-200 dark:bg-lime-800 shadow-xl p-6 rounded-lg text-center">
                <img
                    src={user?.photoURL || 'https://i.ibb.co/ZVFsg37/default-avatar.png'}
                    alt="User"
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{user?.displayName || "No Name"}</h2>
                <p className="text-lime-600 dark:text-lime-300">{user?.email || "No Email"}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        className={`flex items-start gap-4 p-5 shadow-md rounded-2xl text-white cursor-pointer hover:bg-primary/10 hover:shadow-[0_0_10px_3px_lime] transition duration-300 ${card.bg}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        onClick={() => {
                            if (card.path) {
                                navigate(card.path);
                            }
                        }}
                    >
                        {card.icon}
                        <div>
                            <h3 className="text-lg font-semibold">{card.title}</h3>
                            <p className="text-sm">{card.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default DashBoardHome;
