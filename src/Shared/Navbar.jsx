import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Moon, Sun } from "lucide-react";
import logo from "@/assets/logo.png";
import { useTheme } from "../hooks/Theame";


const Navbar = () => {
    const { theme, setTheme } = useTheme();

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
                    {theme === "dark" ? (
                        <Sun className="w-5 h-5" />
                    ) : (
                        <Moon className="w-5 h-5" />
                    )}
                </Button>

                {/* Login/Register Buttons */}
                <Link to="/login">
                    <Button variant="outline">Login</Button>
                </Link>
                <Link to="/register">
                    <Button>Register</Button>
                </Link>

                {/* Mobile Menu (Sheet) */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="md:hidden">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <nav className="grid gap-4 mt-8">{navLinks}</nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
};

export default Navbar;
