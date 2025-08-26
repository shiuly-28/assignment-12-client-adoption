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
    // Dynamic nav links based on auth
    const baseLinks = [
        { to: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
        { to: "/petListing", label: "Pet Listing", icon: <PawPrint className="w-4  h-4" /> },
        { to: "/donation", label: "Donation", icon: <HandCoins className="w-4 h-4" /> },
    ];
    const loggedInLinks = [
        ...baseLinks,
        { to: "/dashboard", label: "Dashboard", icon: <Home className="w-4 h-4" /> },
        { to: "/dashboard/myProfile", label: "My Profile", icon: <PawPrint className="w-4 h-4" /> },
    ];
    const navLinks = (user ? loggedInLinks : baseLinks).map(link => (
        <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
                isActive
                    ? "text-amber-500 font-semibold flex items-center gap-1"
                    : "text-black hover:text-black transition flex items-center gap-1"
            }
        >
            {link.icon}
            {link.label}
        </NavLink>
    ));
    const handleLogout = () => {
        logOut()
            .then(() => console.log("Logged out"))
            .catch((error) => console.error(error));
    };

    // Hide Navbar on login/register pages
    const hideOnRoutes = ["/login", "/register"];
    if (hideOnRoutes.includes(window.location.pathname)) return null;

    return (
        <header className="w-full bg-gray-500 dark:bg-gray-900 shadow-sm border-b border-border sticky top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img src={logo} alt="logo" className="h-10 md:h-12" />
                    <span className="text-lg md:text-xl font-bold text-foreground">Adoption</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="md:flex items-center gap-6">
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
                            <DropdownMenuContent className="w-48 mt-2">
                                <DropdownMenuLabel>{user.displayName}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link to="/dashboard">Dashboard</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/dashboard/myProfile">My Profile</Link>
                                </DropdownMenuItem>
                                {/* Add all protected routes here as needed */}
                                <DropdownMenuSeparator />
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
                                        <Link to="/dashboard/myProfile">
                                            <Button variant="ghost" className="w-full">My Profile</Button>
                                        </Link>
                                        {/* Add all protected routes here as needed */}
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
