// src/layouts/DashboardLayout.jsx

import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu, Home, Plus, PawPrint, Heart, PenLine, ClipboardList, Edit3, Users } from "lucide-react";
import logo from "@/assets/logo.png";
import useUserRole from "../hooks/userUseRole";

import Navbar from "../Shared/Navbar";
import DashboardNavbar from "../Dashboard/DashboardNavbar";

const DashboardLayout = () => {
    const { role, roleLoading } = useUserRole();
    return (
        <div>
            {/* <DashboardNavbar></DashboardNavbar> */}

            <div className="min-h-screen flex">


                {/* Desktop Sidebar */}
                <aside className="hidden md:block w-64 bg-gray-300 dark:bg-gray-900 p-4 space-y-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img src={logo} alt="logo" className="h-10 md:h-12" />
                        <span className="text-lg md:text-xl font-bold text-foreground">Adoption</span>
                    </Link>

                    {/* Sidebar Links */}
                    <ul className="space-y-2">
                        <li>
                            <Link to="/" className="flex items-center gap-2 hover:hover:text-amber-500">
                                <Home size={18} /> Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/myProfile" className="flex items-center gap-2 hover:hover:text-amber-500">
                                <Home size={18} />MyProfile
                            </Link>
                        </li>

                        <li>
                            <Link to="/dashboard/AddAPet" className="flex items-center gap-2 hover:hover:text-amber-500">
                                <Plus size={18} /> Add a Pet
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/myPets" className="flex items-center gap-2 hover:text-amber-500">
                                <PawPrint size={18} />My Pets
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/createDonation" className="flex items-center gap-2 hover:hover:text-amber-500">
                                <Plus size={18} /> Create Donation
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/myDonation" className="flex items-center gap-2 hover:hover:text-amber-500">
                                <Heart size={18} />My Donation
                            </Link>
                        </li>


                        <li>
                            <Link to="/dashboard/myDonationCampaigns" className="flex items-center gap-2 hover:hover:text-amber-500">
                                <ClipboardList size={18} />My Donation Campaigns
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/adoption" className="flex items-center gap-2 hover:hover:text-amber-500">
                                <Users size={18} /> Adoption Request
                            </Link>
                        </li>
                        {!roleLoading && role === 'admin' &&
                            <>

                                <li>
                                    <Link to="/dashboard/all-users" className="flex items-center gap-2 hover:hover:text-amber-500">
                                        <Users size={18} /> All Users
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/all-pets" className="flex items-center gap-2 hover:hover:text-amber-500">
                                        <PawPrint size={18} /> All Pets
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/all-donations" className="flex items-center gap-2 hover:hover:text-amber-500">
                                        <Heart size={18} /> All Donations
                                    </Link>
                                </li>
                            </>
                        }
                    </ul>
                </aside>

                {/* Mobile Sidebar */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden absolute top-4 left-4 z-50"
                        >
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64 p-4 space-y-4">
                        {/* Logo for mobile */}
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <img src={logo} alt="logo" className="h-10" />
                            <span className="text-lg font-bold">Adoption</span>
                        </Link>
                    </SheetContent>
                </Sheet>

                {/* Main Content */}
                <main className="flex-1 p-4">
                    <Outlet />
                </main>
            </div>
        </div>

    );
};

export default DashboardLayout;