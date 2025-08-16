import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Moon, Sun } from "lucide-react";
import logo from "@/assets/logo.png";
import { useTheme } from "../hooks/Theame";
import { Home, PawPrint, HandCoins, } from "lucide-react";
import { MdOutlineLogin } from "react-icons/md";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import useAuth from "../hooks/useAuth";

const Navbar = () => {
    const { theme, setTheme } = useTheme();
    const { user, logOut } = useAuth();
    const navLinks = (
        <>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive
                        ? "text-primary font-semibold flex items-center gap-1"
                        : "text-muted-foreground hover:text-primary transition flex items-center gap-1"
                }
            >
                <Home className="w-4 h-4" />
                Home
            </NavLink>
            <NavLink
                to="/petListing"
                className={({ isActive }) =>
                    isActive
                        ? "text-primary font-semibold flex items-center gap-1"
                        : "text-muted-foreground hover:text-primary transition flex items-center gap-1"
                }
            >
                <PawPrint className="w-4 h-4" />
                Pet Listing
            </NavLink>
            <NavLink
                to="/donation"
                className={({ isActive }) =>
                    isActive
                        ? "text-primary font-semibold flex items-center gap-1"
                        : "text-muted-foreground hover:text-primary transition flex items-center gap-1"
                }
            >
                <HandCoins className="w-4 h-4" />
                Donation
            </NavLink>
        </>
    );
    const handleLogout = () => {
        logOut()
            .then(() => console.log("Logged out"))
            .catch((error) => console.error(error));
    };

    return (
        <header className="w-full bg-background border border-border rounded shadow-sm px-4 py-3 mt-6">
            <div className=" mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img src={logo} alt="logo" className="h-10 md:h-12" />
                    <span className="text-lg md:text-xl font-bold text-foreground">Adoption</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    {navLinks}
                </nav>

                {/* Actions (Theme + Auth) */}
                <div className="flex items-center gap-2">
                    {/* Theme Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        aria-label="Toggle Theme"
                    >
                        {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </Button>

                    {/* Auth Buttons (Desktop) */}
                    {!user ? (
                        <div className="hidden md:flex items-center gap-2">
                            <Link to="/login">
                                <Button variant="outline" className="bg-amber-500"><MdOutlineLogin />Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="outline" className="bg-amber-500"><MdOutlineLogin />Register</Button>
                            </Link>
                        </div>
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

                    {/* Mobile Menu Button */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="w-5 h-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-64 p-4">
                            <nav className="flex flex-col gap-4">
                                {navLinks}
                                <hr className="my-2" />
                                {!user ? (
                                    <>
                                        <Link to="/login">
                                            <Button variant="outline" className="w-full">Login</Button>
                                        </Link>
                                        <Link to="/register">
                                            <Button className="w-full">Register</Button>
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
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
