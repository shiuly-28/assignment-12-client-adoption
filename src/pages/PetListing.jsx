import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const PetListing = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/pets'); // তোমার backend URL
                const data = await res.json();
                setPets(data);
            } catch (err) {
                console.error('Failed to fetch pets:', err);
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
                                <CardTitle>{pet.name}</CardTitle>
                                <p className="text-gray-500">{pet.age}</p>
                                <p className="text-gray-500">{pet.location}</p>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">View Details</Button>
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
