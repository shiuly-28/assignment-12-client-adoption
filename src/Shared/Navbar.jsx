
import { Link, NavLink } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import logo from "../assets/logo.png";

const Navbar = () => {
    const navLinks = (
        <>
            <NavLink to="/" className="nav-link">
                Home
            </NavLink>
            <NavLink to="/petListing" className="nav-link">
                Pet Listing
            </NavLink>
            <NavLink to="/donation" className="nav-link">
                Donation
            </NavLink>
        </>
    );

    return (
        <header className="flex items-center justify-between px-4 py-2 bg-black rounded-2xl mt-6 shadow-md">
            <Link to="/" className="flex items-center gap-2">
                <img src={logo} alt="logo" className="h-14 text-white" />
                <span className="text-xl font-bold text-white">Adoption</span>
            </Link>

            <nav className="hidden md:flex text-white items-center gap-4">{navLinks}</nav>

            <div className="flex items-center gap-4">
                <Link to="/login">
                    <Button>Login</Button>
                </Link>
                <Link to="/register">
                    <Button>Register</Button>
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="md:hidden">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <nav className="grid gap-4 text-white font-medium">{navLinks}</nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
};

export default Navbar;
