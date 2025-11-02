import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { FaGem, FaLocationDot, FaPaw, FaMagnifyingGlass } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";

const PetSkeletonCard = () => (
    <Card className="h-full flex flex-col justify-between overflow-hidden shadow-lg">
        <CardHeader className="p-0">
            <Skeleton height={220} className="w-full" />
        </CardHeader>
        <CardContent className="p-4">
            <Skeleton width="70%" height={28} className="mb-2" />
            <Skeleton width="50%" height={20} className="mb-2" />
            <Skeleton width="60%" height={20} />
        </CardContent>
        <CardFooter className="p-4 pt-0">
            <Skeleton height={44} width="100%" borderRadius={8} />
        </CardFooter>
    </Card>
);

const PAGE_SIZE = 6;

const PetListing = () => {
    const axios = useAxios();
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
    const [category, setCategory] = useState('');

    const fetchPets = async ({ pageParam = 1 }) => {
        const res = await axios.get(`/pets?page=${pageParam}&limit=${PAGE_SIZE}&search=${debouncedSearchQuery}`);
        return res.data;
    };

    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
    } = useInfiniteQuery({
        queryKey: ['pets', debouncedSearchQuery],
        queryFn: fetchPets,
        getNextPageParam: (lastPage) => lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    });

    const { darkMode } = useAuth();

    useEffect(() => {
        refetch();
    }, [debouncedSearchQuery, refetch]);

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const filteredPets = data?.pages
        .flatMap(page => page.pets)
        .filter(pet => category ? pet.category.toLowerCase() === category.toLowerCase() : true);

    const categories = [
        { value: '', label: 'All Categories', icon: '🐾' },
        { value: 'Dog', label: 'Dogs', icon: '🐕' },
        { value: 'Cat', label: 'Cats', icon: '🐈' },
        { value: 'Bird', label: 'Birds', icon: '🦜' },
        { value: 'Rabbit', label: 'Rabbits', icon: '🐰' },
        { value: 'Fish', label: 'Fish', icon: '🐠' },
        { value: 'Others', label: 'Others', icon: '🦎' }
    ];

    return (
        <div className="container mx-auto px-4 py-8 lg:py-12">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8"
            >
                <div className="inline-flex items-center justify-center gap-2 mb-4">
                    <FaPaw className="text-4xl text-amber-500" />
                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                        Available Pets
                    </h1>
                    <FaPaw className="text-4xl text-amber-500" />
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Find your perfect furry (or feathery) companion and give them a loving home
                </p>
            </motion.div>

            {/* Search & Filter Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
            >
                <div className="flex flex-col md:flex-row items-center gap-4">
                    {/* Search Input */}
                    <div className="relative w-full md:flex-1">
                        <FaMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search pets by name or location..."
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg 
                                     focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
                                     bg-gray-50 dark:bg-gray-900 transition-all duration-300"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Category Select */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full md:w-auto px-6 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg
                                 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
                                 bg-gray-50 dark:bg-gray-900 cursor-pointer transition-all duration-300
                                 font-medium"
                    >
                        {categories.map(cat => (
                            <option key={cat.value} value={cat.value}>
                                {cat.icon} {cat.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Active Filters Display */}
                {(searchQuery || category) && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {searchQuery && (
                            <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-full text-sm">
                                Search: {searchQuery}
                            </span>
                        )}
                        {category && (
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                                Category: {categories.find(c => c.value === category)?.label}
                            </span>
                        )}
                    </div>
                )}
            </motion.div>

            {/* Pets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {isLoading ? (
                    Array.from({ length: PAGE_SIZE }).map((_, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <PetSkeletonCard />
                        </motion.div>
                    ))
                ) : isError ? (
                    <div className="col-span-full text-center py-12">
                        <div className="text-red-500 text-xl font-semibold mb-2">
                            Oops! Something went wrong
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">{error.message}</p>
                    </div>
                ) : filteredPets?.length === 0 ? (
                    <div className="col-span-full text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                            No pets found
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            Try adjusting your search or filter criteria
                        </p>
                    </div>
                ) : (
                    filteredPets?.map((pet, index) => (
                        <motion.div
                            key={pet._id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{
                                y: -8,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <Card className="h-full flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                                <CardHeader className="p-0 relative overflow-hidden">
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={pet.image}
                                            alt={pet.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-md">
                                            <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                                                {pet.category}
                                            </span>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-5 flex-grow">
                                    <CardTitle className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
                                        {pet.name}
                                    </CardTitle>
                                    
                                    {pet.description && (
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                                            {pet.description}
                                        </p>
                                    )}
                                    
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                            <FaGem className="text-amber-500 text-sm" />
                                            <span className="font-semibold">Age:</span>
                                            <span>{pet.age}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                            <FaLocationDot className="text-red-500 text-sm" />
                                            <span className="font-semibold">Location:</span>
                                            <span className="truncate">{pet.location}</span>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-5 pt-0">
                                    <Button
                                        asChild
                                        className={`w-full h-12 text-base font-semibold transition-all duration-300 
                                                  ${darkMode 
                                                    ? "bg-amber-600 hover:bg-amber-700 text-white" 
                                                    : "bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white"
                                                  } 
                                                  shadow-md hover:shadow-lg transform hover:-translate-y-0.5`}
                                    >
                                        <Link to={`/adoptDetails/${pet._id}`} className="flex items-center justify-center gap-2">
                                            <FaPaw className="text-sm" />
                                            View Details
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Load More Section */}
            <div ref={ref} className="mt-12 flex items-center justify-center">
                {isFetchingNextPage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-3 text-gray-600 dark:text-gray-400"
                    >
                        <div className="w-6 h-6 border-3 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="font-medium">Loading more pets...</p>
                    </motion.div>
                )}
                {!hasNextPage && !isLoading && filteredPets?.length > 0 && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-gray-500 dark:text-gray-400 font-medium py-4 px-6 bg-gray-100 dark:bg-gray-800 rounded-full"
                    >
                        🎉 You've seen all available pets!
                    </motion.p>
                )}
            </div>
        </div>
    );
};

export default PetListing;