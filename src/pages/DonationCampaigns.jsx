import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DonationCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchCampaigns = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/donations`, {
                params: {
                    page,
                    limit: 6,
                    sort: 'desc' // ✅ descending latest
                }
            });

            const newData = res.data?.campaigns || [];
            console.log(res.data);
            if (newData.length === 0) {
                setHasMore(false);
            } else {
                setCampaigns((prev) => [...prev, ...newData]);
                setPage((prev) => prev + 1);
            }
        } catch (err) {
            console.error("Error fetching campaigns:", err);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    useEffect(() => {
        console.log("Campaigns", campaigns);
    }, [])

    return (
        <div className="p-4 container mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">🐾 All Donation Campaigns</h2>

            <InfiniteScroll
                dataLength={campaigns.length}
                next={fetchCampaigns}
                hasMore={hasMore}
                loader={<p className="text-center py-4">Loading more campaigns...</p>}
                endMessage={<p className="text-center py-4 text-green-500">🎉 No more campaigns to show!</p>}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {campaigns.map((item) => (
                        <div key={item._id} className="border rounded-xl shadow-md p-4 bg-white">
                            <img
                                src={item.petImage}
                                alt={item.petName}
                                className="w-full h-48 object-cover rounded-md mb-3"
                            />
                            <h3 className="text-xl font-semibold mb-1">{item.petName}</h3>
                            <p className="text-gray-700"><strong>Target:</strong> ${item.maxAmount}</p>
                            <p className="text-gray-700"><strong>Raised:</strong> ${item.totalDonated || 0}</p>


                            <Button asChild className="mt-3 w-full">
                                <Link to={`/donationDetails/${item._id}`}>
                                    View Details
                                </Link>
                            </Button>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default DonationCampaigns;
