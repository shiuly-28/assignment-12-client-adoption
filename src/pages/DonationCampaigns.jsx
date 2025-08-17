import { useContext, useEffect, useState } from "react";
import { useDebounce } from 'use-debounce';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { AuthContext } from "../context/AuthContext";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

const PAGE_SIZE = 6;

// Skeleton Card
const CampaignSkeletonCard = () => (
    <div className="border rounded-xl shadow-md p-4 bg-white">
        <Skeleton height={192} className="w-full rounded-md mb-3" />
        <Skeleton width={160} height={24} className="mb-2" />
        <Skeleton width={100} height={16} />
        <Skeleton width={120} height={16} />
        <Skeleton height={40} borderRadius={8} className="mt-3" />
    </div>
);

const DonationCampaigns = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
    const axios = useAxios();
    const [category, setCategory] = useState('');

    // API fetcher
    const fetchDonationCampaigns = async ({ pageParam = 1, search = '' }) => {
        const res = await axios.get(`/donations`, {
            params: {
                page: pageParam,
                limit: PAGE_SIZE,
                sort: 'desc',
                search: search
            }
        });
        return res.data;
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
        refetch,
    } = useInfiniteQuery({
        queryKey: ['donations', debouncedSearchQuery],
        queryFn: ({ pageParam = 1 }) => fetchDonationCampaigns({ pageParam, search: debouncedSearchQuery }),
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.totalPages) {
                return lastPage.page + 1;
            }
            return undefined;
        }
    });

    console.log("API Response 👉", data);

    const { darkMode } = useAuth(AuthContext);

    useEffect(() => {
        refetch();
    }, [debouncedSearchQuery, refetch]);

    const { ref, inView } = useInView();

    // Auto load more when scrolled to the bottom
    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {Array.from({ length: PAGE_SIZE }).map((_, index) => (
                    <CampaignSkeletonCard key={index} />
                ))}
            </div>
        );
    }

    if (isError) {
        return <p className="text-center text-red-500 mt-6">❌ Error: {error.message}</p>;
    }

    // ✅ Safe campaigns extraction (handles donations OR campaigns OR items)
    const campaigns = data?.pages?.flatMap(page =>
        page.campaigns || page.donations || page.items || []
    ) || [];

    // ✅ Frontend filtering by category
    const filteredCampaigns = campaigns.filter(item => {
        if (!category) return true; // Show all if category not selected
        return item?.category?.toLowerCase() === category.toLowerCase();
    });

    return (
        <div className="p-4 container mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">🐾 All Donation Campaigns</h2>
            <p className="text-center text-gray-500">Your donation helps give pets a second chance at life, love, and a forever home.</p>

            {/* Search & Category Filter */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 mt-5">
                <div className="mb-6 w-full md:w-1/2">
                    <input
                        type="text"
                        placeholder="🔍 Search campaigns by name or description..."
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-3 border border-gray-300 rounded-md"
                >
                    <option value="">All Categories</option>
                    <option value="Dog">Dogs</option>
                    <option value="Cat">Cats</option>
                    <option value="Bird">Birds</option>
                    <option value="Rabbit">Rabbits</option>
                    <option value="Fish">Fish</option>
                    <option value="Others">Others</option>
                </select>
            </div>

            {/* Campaigns Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCampaigns?.map(item => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.03, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)" }}
                        transition={{ duration: 0.3 }}
                        className="border rounded-xl shadow-md p-4 bg-white"
                    >
                        <img
                            src={item.petImage}
                            alt={item.petName}
                            className="w-full h-48 object-cover rounded-md mb-3"
                        />
                        <h3 className={`${darkMode ? "text-white " : "text-black "}text-3xl font-bold mb-2`}>
                            {item.petName}
                        </h3>

                        <p className="text-gray-700"><strong>📋 Max Donation Amount:</strong> {item.maxAmount}$</p>
                        <p className="text-gray-700"><strong>📍 Donation Raised:</strong> {item.totalDonated}$</p>
                        <Button asChild className={`${darkMode ? "text-white " : "text-black bg-amber-500 "} w-full mt-4`}>
                            <Link to={`/donationDetails/${item._id}`}>
                                View Details
                            </Link>
                        </Button>
                    </motion.div>
                ))}
            </div>

            {/* Infinite scroll trigger area */}
            <div ref={ref} className="mt-6 flex justify-center">
                {isFetchingNextPage && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {Array.from({ length: PAGE_SIZE }).map((_, idx) => (
                            <CampaignSkeletonCard key={idx} />
                        ))}
                    </div>
                )}
            </div>

            {!hasNextPage && (
                <p className="text-center mt-6 text-green-500">🎉 No more campaigns to show!</p>
            )}
        </div>
    );
};

export default DonationCampaigns;
