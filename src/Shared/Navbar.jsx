import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Moon, Sun } from "lucide-react";
import logo from "@/assets/logo.png";
import { useTheme } from "../hooks/Theame";

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
    console.log(user);
    const navLinks = (
        <>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive
                        ? "text-primary font-semibold"
                        : "text-foreground hover:text-primary transition"
                }
            >
                Home
            </NavLink>
            <NavLink
                to="/petListing"
                className={({ isActive }) =>
                    isActive
                        ? "text-primary font-semibold"
                        : "text-foreground hover:text-primary transition"
                }
            >
                Pet Listing
            </NavLink>
            <NavLink
                to="/donation"
                className={({ isActive }) =>
                    isActive
                        ? "text-primary font-semibold"
                        : "text-foreground hover:text-primary transition"
                }
            >
                Donation
            </NavLink>
        </>
    );

    const handleLogout = () => {
        logOut()
            .then(() => console.log("Logged out"))
            .catch(error => console.error(error));
    };

    return (
        <header className="flex items-center justify-between px-4 py-3 bg-background border border-border rounded-xl mt-6 shadow-sm">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
                <img src={logo} alt="logo" className="h-12" />
                <span className="text-xl font-bold text-foreground">Adoption</span>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-6">{navLinks}</nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
                {/* Dark/Light Mode Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    aria-label="Toggle Dark Mode"
                >
                    {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>

                {/* Login/Register Buttons */}
                {
                    !user && (
                        <div className="hidden lg:flex gap-2">
                            <Link to="/login" className="btn btn-outline btn-sm text-green-700">
                                <Button>Login</Button>
                            </Link>
                            <Link to="/register" className="btn btn-outline btn-sm text-green-700">
                                <Button>Register</Button>
                            </Link>
                        </div>
                    )
                }

                {/* If logged in */}
                {user && (
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


                {/* Mobile: Dropdown Menu */}
                <div className="dropdown dropdown-end lg:hidden">
                    <label tabIndex={0} className="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="menu dropdown-content mt-3 z-[999] p-3 shadow bg-base-100 rounded-box w-56 space-y-2">
                        {navLinks}

                        {!user && (
                            <>
                                <li className="lg:hidden" variant="outline">
                                    <Link to="/login" className="w-full flex items-center justify-center rounded-3xl gap-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white p-2">Login</Link>
                                </li>
                                <li className="lg:hidden">
                                    <Link to="/register" className="btn btn-outline btn-sm text-green-700 w-full">Register</Link>
                                </li>
                            </>
                        )}

                        {user && (
                            <>
                                <li className="lg:hidden mt-2 flex items-center gap-2">
                                    <img src={user.photoURL} className="w-8 h-8 rounded-full ring-2 ring-green-500" alt="user" />
                                    <span>{user.displayName}</span>
                                </li>
                                <li className="lg:hidden">
                                    <button onClick={handleLogout} className="btn btn-sm btn-outline text-green-700 w-full">Logout</button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    );



};

export default Navbar;
