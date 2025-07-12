import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router';

const PetListing = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/pets');
                const data = await res.json();
                setPets(data);
            } catch (error) {
                console.error('Failed to fetch pets:', error);
            }
        };

        fetchPets();
    }, []);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Pet Listing</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pets.length > 0 ? (
                    pets.map((pet) => (
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
                                    <Button className="w-full">Adopt Details</Button></Link>
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
