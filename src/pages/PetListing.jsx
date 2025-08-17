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
import { FaGem, FaLocationDot } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";

const PetSkeletonCard = () => (
    <Card className="h-full flex flex-col justify-between">
        <CardHeader>
            <Skeleton height={192} className="rounded-t-lg w-full" />
        </CardHeader>
        <CardContent>
            <CardTitle><Skeleton width={120} /></CardTitle>
            <p className="text-gray-500"><Skeleton width={80} /></p>
            <p className="text-gray-500"><Skeleton width={100} /></p>
        </CardContent>
        <CardFooter>
            <Skeleton height={40} width={'100%'} borderRadius={8} />
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

    // ✅ Frontend filtering by category (case-insensitive)
    const filteredPets = data?.pages
        .flatMap(page => page.pets)
        .filter(pet => category ? pet.category.toLowerCase() === category.toLowerCase() : true);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold mb-4 text-center">🐾 Available Pets</h1>
            <p className='text-center text-gray-500'>Find your perfect furry (or feathery) companion</p>
            <hr />

            {/* Search & Category Filter */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 mt-5">
                <input
                    type="text"
                    placeholder="🔍 Search pets by name or location..."
                    className="w-full md:w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

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

            {/* Pets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading ? (
                    Array.from({ length: PAGE_SIZE }).map((_, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <PetSkeletonCard />
                        </motion.div>
                    ))
                ) : isError ? (
                    <p className="text-red-500 text-center">Error: {error.message}</p>
                ) : filteredPets.length === 0 ? (
                    <p className="text-center text-gray-500">No pets found for this category.</p>
                ) : (
                    filteredPets.map((pet, index) => (
                        <motion.div
                            key={pet._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{
                                scale: 1.03,
                                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                            }}
                        >
                            <Card className="h-full flex flex-col justify-between">
                                <CardHeader>
                                    <img
                                        src={pet.image}
                                        alt={pet.name}
                                        className="rounded-t-lg w-full h-48 object-cover"
                                    />
                                </CardHeader>
                                <CardContent>
                                    <CardTitle className="font-bold text-2xl p-2">Name: {pet.name}</CardTitle>
                                    <div className='p-2'>
                                        <p className="text-gray-500 flex"><FaGem /><span className='font-bold ml-1'>Age:</span> {pet.age}</p>
                                        <p className="text-gray-500 flex"><FaLocationDot /><span className='font-bold ml-1'>Location:</span> {pet.location}</p>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild className={`${darkMode ? "text-white " : "text-black bg-amber-500 "} w-full mt-2`}>
                                        <Link to={`/adoptDetails/${pet._id}`}>
                                            View Details
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))
                )}
            </div>

            <div ref={ref} className="h-10 mt-8 flex items-center justify-center">
                {isFetchingNextPage && <p className="text-gray-500">Loading more pets...</p>}
                {!hasNextPage && !isLoading && <p className="text-gray-500">No more pets to load.</p>}
            </div>
        </div>
    );
};

export default PetListing;
