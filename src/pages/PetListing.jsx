import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAxios from '../hooks/useAxios';


const PetListing = () => {
    const axios = useAxios()
    const getPets = async () => {
        const res = await axios.get('http://localhost:5000/pets')
        return res
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['pets'],
        queryFn: getPets,
    })
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error: {error.message}</div>
    }


    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Pet Listing</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data?.data.length > 0 ? (
                    data?.data.map((pet) => (
                        <Card key={pet._id}>
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
                                <Link to={`/adoptDetails/${pet._id}`}>
                                    <Button className="w-full">veiwing Details</Button></Link>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <p>No pets found.</p>
                )}
            </div>
        </div>
    );
};

export default PetListing;
