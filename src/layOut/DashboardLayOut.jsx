// src/layouts/DashboardLayout.jsx

import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu, Home, Plus, PawPrint, Heart, PenLine, ClipboardList, Edit3, Users } from "lucide-react";
import logo from "@/assets/logo.png";

const DashboardLayout = () => {
    return (
        <div className="min-h-screen flex">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 bg-gray-100 dark:bg-gray-900 p-4 space-y-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 mb-6">
                    <img src={logo} alt="logo" className="h-12" />
                    <span className="text-xl font-bold text-foreground">Adoption</span>
                </Link>

                {/* Sidebar Links */}
                <ul className="space-y-2">
                    <li>
                        <Link to="/" className="flex items-center gap-2 hover:text-primary">
                            <Home size={18} /> Home
                        </Link>
                    </li>

                    <li>
                        <Link to="/dashboard/AddAPet" className="flex items-center gap-2 hover:text-primary">
                            <Plus size={18} /> Add a Pet
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/myPets" className="flex items-center gap-2 hover:text-primary">
                            <PawPrint size={18} /> My Pets
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/myDonation" className="flex items-center gap-2 hover:text-primary">
                            <Heart size={18} /> My Donation
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/updatePet" className="flex items-center gap-2 hover:text-primary">
                            <PenLine size={18} /> Update Pet
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/createDonation" className="flex items-center gap-2 hover:text-primary">
                            <Plus size={18} /> Create Donation
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/myDonationCampaigns" className="flex items-center gap-2 hover:text-primary">
                            <ClipboardList size={18} /> My Donation Campaigns
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/editDonation" className="flex items-center gap-2 hover:text-primary">
                            <Edit3 size={18} /> Edit Donation
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/adoption" className="flex items-center gap-2 hover:text-primary">
                            <Users size={18} /> Adoption Request
                        </Link>
                    </li>
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

                    {/* Sidebar Links */}
                    <ul className="space-y-2">
                        <li>
                            <Link to="/" className="flex items-center gap-2 hover:text-primary">
                                <Home size={18} /> Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/AddAPet" className="flex items-center gap-2 hover:text-primary">
                                <Plus size={18} /> Add a Pet
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/myPets" className="flex items-center gap-2 hover:text-primary">
                                <PawPrint size={18} /> My Pets
                            </Link>
                        </li>
                    </ul>
                </SheetContent>
            </Sheet>

            {/* Main Content */}
            <main className="flex-1 p-4">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
