import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import DonateModal from "./DonateModal"; // 👉 Stripe Modal Component
import useAuth from "../hooks/useAuth";
import { AuthContext } from "../context/AuthContext";

const DonationDetails = () => {
    const { id } = useParams();
    const [campaign, setCampaign] = useState();
    const [recommended, setRecommended] = useState([]);
    const { darkMode } = useAuth(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://localhost:5000/donations/${id}`);
            setCampaign(res.data);

            // Recommended campaigns (excluding current one)
            const rec = await axios.get("http://localhost:5000/donations?limit=3");
            const filtered = rec.data.campaigns.filter((item) => item._id !== id);
            setRecommended(filtered.slice(0, 3));
        };
        fetchData();


    }, [id]);
    console.log(campaign);

    if (!campaign) return <div>Loading...</div>;

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-3xl font-bold mb-4 text-center">{campaign.name} Donation Campaign</h2>

            <div className="grid md:grid-cols-2 gap-8">
                <img src={campaign.petImage
                } alt={campaign.name} className="w-full h-64 object-cover rounded" />
                <div>
                    <p className="p-1"><strong className={`${darkMode ? "text-white " : "text-gray-500 "}`}>🧾Added by: </strong >{campaign.userEmail}</p>
                    <p className="p-1"><strong className={`${darkMode ? "text-white " : "text-gray-500 "}`}>📋Max Donation Amount:</strong> {campaign.maxAmount}$</p>
                    <p className="p-1"><strong className={`${darkMode ? "text-white " : "text-gray-500 "}`}>📍Donation Raised:</strong> {campaign.totalDonated || 0}$</p>

                    <p className="mb-2"><strong className={`${darkMode ? "text-white " : "text-gray-500 "}`}>Posted:</strong> {campaign.lastDate}</p>
                    <p className="mb-4"><strong className={`${darkMode ? "text-white " : "text-gray-500 "}`}></strong>{campaign.longDescription}</p>

                    {/*  Donate Now Modal */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className={`${darkMode ? "text-white " : "text-black bg-amber-500"} w-full`}>Donate Now</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Donate to {campaign.name}</DialogTitle>
                            </DialogHeader>
                            <DonateModal campaignId={campaign._id} />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Recommended Campaigns */}
            <div className="mt-12">
                <h3 className="text-2xl font-semibold mb-4">Recommended Donation Campaigns</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {recommended.map((item) => (
                        <div key={item._id} className="border rounded-lg p-4 shadow">
                            <img src={item.petImage} alt={item.
                                petName} className="w-full h-40 object-cover rounded mb-3" />
                            <h4 className="font-bold text-2xl p-3">{item.
                                petName}</h4>
                            <p className="p-1"><strong className={`${darkMode ? "text-white " : "text-gray-500 "}`}>📋Max Donation Amount:</strong> {campaign.maxAmount}$</p>
                            <p className="p-1"><strong className={`${darkMode ? "text-white " : "text-gray-500 "}`}>📍Donation Raised:</strong> {campaign.totalDonated || 0}$</p>
                            <Button className={`${darkMode ? "text-white " : "text-black bg-amber-500"} w-full mt-2`} asChild>
                                <a href={`/donationDetails/${item._id}`}>View Details</a>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DonationDetails;
