import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
            {/* Animated Image */}
            <motion.img
                src="https://i.ibb.co.com/tp0FgmPC/warning-8908707-1280.png"
                alt="Error"
                className="w-72 md:w-96"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            />

            {/* Title */}
            <motion.h1
                className="text-4xl font-bold text-gray-800 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                Oops! Page Not Found
            </motion.h1>

            {/* Subtitle */}
            <p className="text-gray-600 mt-2 mb-6">
                The page you’re looking for doesn’t exist.
            </p>

            {/* Button to Home */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <Link
                    to="/"
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                    Go Back Home
                </Link>
            </motion.div>
        </div>
    );
};

export default ErrorPage;
