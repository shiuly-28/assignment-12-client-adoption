// src/components/shared/Footer.jsx
import { Home, PawPrint, HeartHandshake, Dog } from "lucide-react";
import { Mail, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator"

const Footer = () => {
    return (
        <footer className="w-full mt-10 bg-black border-t">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-muted-foreground">
                    <div>
                        <h3 className="font-semibold text-white mb-2 ">About</h3>
                        <p>We provide modern solutions for pet adoption, delivery, and care.</p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2 text-white">Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/" className="flex items-center gap-2 hover:underline">
                                    <Home size={18} />
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/petListing" className="flex items-center gap-2 hover:underline">
                                    <PawPrint size={18} />
                                    Pet Listing
                                </a>
                            </li>
                            <li>
                                <a href="/donation" className="flex items-center gap-2 hover:underline">
                                    <HeartHandshake size={18} />
                                    Donations
                                </a>
                            </li>
                            <li>
                                <a href="/myPets" className="flex items-center gap-2 hover:underline">
                                    <Dog size={18} />
                                    My Pets
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2 text-white">Contact</h3>
                        <p className="flex items-center gap-2">
                            <Mail className="w-5 h-5 " />
                            shulybd1245@gmail.com
                        </p>
                        <p className="flex items-center gap-2">
                            <Phone className="w-5 h-5 " />
                            +880 1757321528
                        </p>
                    </div>
                </div>

                <Separator className="my-10 w-screen" />

                <p className="text-center text-xs text-muted-foreground">
                    &copy; {new Date().getFullYear()} PetAdopt Inc. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer
