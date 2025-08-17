import React from 'react';
import logo from "@/assets/logo.png";
import { Link } from 'react-router-dom'; // <-- ঠিক করলাম
import useAuth from '../hooks/useAuth';
import { Button } from "@/components/ui/button"; // Button import
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetTrigger,
    SheetContent
} from "@/components/ui/sheet"; // Sheet import
import { Menu, Moon, Sun } from 'lucide-react'; // Menu icon
import { MdOutlineLogin } from 'react-icons/md'; // Login icon
import { useTheme } from '../hooks/Theame';



const DashboardNavbar = () => {
    const { user, logOut } = useAuth();
    const { theme, setTheme } = useTheme();
    const handleLogout = () => {
        logOut()
            .then(() => console.log("Logged out"))
            .catch((error) => console.error(error));
    };

    return (
        <div className="flex justify-between items-center px-4 py-3 bg-[#568F87] shadow-md">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
                <img src={logo} alt="logo" className="h-10 md:h-12" />
                <span className="text-lg md:text-xl font-bold text-foreground">Adoption</span>
            </Link>

            {/* Desktop Navigation */}


            {/* Auth Buttons / Dropdown (Desktop) */}
            <div className="hidden md:flex items-center gap-2">
                {/* Actions (Theme + Auth) */}

                {/* Theme Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    aria-label="Toggle Theme"
                >
                    {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>
                {!user ? (
                    <>
                        <Link to="/login">
                            <Button variant="outline" className="bg-amber-500 flex items-center gap-1">
                                <MdOutlineLogin /> Login
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="outline" className="bg-amber-500 flex items-center gap-1">
                                <MdOutlineLogin /> Register
                            </Button>
                        </Link>
                    </>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <img
                                src={user.photoURL}
                                alt="User"
                                className="w-10 h-10 rounded-full ring-2 ring-green-600 cursor-pointer"
                            />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-40 mt-2">
                            <DropdownMenuLabel>{user.displayName}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link to="/dashboard" className="w-full">Dashboard</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout}>
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="w-5 h-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-64 p-4">

                        <hr className="my-2" />
                        {!user ? (
                            <>
                                <Link to="/login">
                                    <Button variant="outline" className="w-full flex items-center gap-1">
                                        <MdOutlineLogin /> Login
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button className="w-full flex items-center gap-1">
                                        <MdOutlineLogin /> Register
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center gap-2 mb-2">
                                    <img
                                        src={user.photoURL}
                                        alt="User"
                                        className="w-8 h-8 rounded-full ring-2 ring-green-500"
                                    />
                                    <span className="text-sm font-medium">{user.displayName}</span>
                                </div>
                                <Link to="/dashboard">
                                    <Button variant="ghost" className="w-full">Dashboard</Button>
                                </Link>
                                <Button
                                    onClick={handleLogout}
                                    variant="outline"
                                    className="w-full"
                                >
                                    Logout
                                </Button>
                            </>
                        )}

                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
};

export default DashboardNavbar;
