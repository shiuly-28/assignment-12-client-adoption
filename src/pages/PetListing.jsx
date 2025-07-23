import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

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

    const fetchPets = async ({ pageParam = 1 }) => {
        const res = await axios.get(`/pets?page=${pageParam}&limit=${PAGE_SIZE}`);
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
    } = useInfiniteQuery({
        queryKey: ['pets'],
        queryFn: fetchPets,
        getNextPageParam: (lastPage) => {
            return lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined;
        },
    });

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">🐾 Pet Listing</h1>

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
                ) : (
                    data.pages.flatMap((page, pageIndex) =>
                        page.pets.map((pet, index) => (
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
                                        <CardTitle>Name: {pet.name}</CardTitle>
                                        <p className="text-gray-500">Age: {pet.age}</p>
                                        <p className="text-gray-500">Location: {pet.location}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button asChild className="w-full">
                                            <Link to={`/adoptDetails/${pet._id}`}>
                                                Viewing Details
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))
                    )
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
