import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const DonationCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchCampaigns = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/donations?page=${page}&limit=6`);
            const newData = res.data;

            if (newData.length === 0) {
                setHasMore(false);
            } else {
                setCampaigns(prev => [...prev, ...newData]);
                setPage(prev => prev + 1);
            }
        } catch (err) {
            console.error("Error fetching campaigns:", err);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold text-center mb-4">🐾 All Donation Campaigns</h2>

            <InfiniteScroll
                dataLength={campaigns.length}
                next={fetchCampaigns}
                hasMore={hasMore}
                loader={<p className="text-center py-4">Loading more campaigns...</p>}
                endMessage={<p className="text-center py-4">🎉 No more campaigns to show!</p>}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {campaigns.map((item) => (
                        <div key={item._id} className="border rounded-xl shadow-md p-4">
                            <img
                                src={item.image}
                                alt={item.petName}
                                className="w-full h-48 object-cover rounded-md mb-3"
                            />
                            <h3 className="text-xl font-semibold">{item.petName}</h3>
                            <p><strong>Target:</strong> ${item.maxDonation}</p>
                            <p><strong>Raised:</strong> ${item.donatedAmount}</p>
                            <button className="mt-3 btn btn-primary w-full">View Details</button>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default DonationCampaigns;
