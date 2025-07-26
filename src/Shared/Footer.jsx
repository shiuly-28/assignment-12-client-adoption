// src/components/shared/Footer.jsx

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
                        <ul className="space-y-1">
                            <li><a href="/" className="hover:underline">Home</a></li>
                            <li><a href="/petListing" className="hover:underline">Pet Listing</a></li>
                            <li><a href="/donation" className="hover:underline">Donations</a></li>
                            <li><a href="/myPets" className="hover:underline">MyPets</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2 text-white">Contact</h3>
                        <p>Email: shulybd1245@gmail.com</p>
                        <p>Phone: +880 1757321528</p>
                    </div>
                </div>

                <Separator className="my-6" />

                <p className="text-center text-xs text-muted-foreground">
                    &copy; {new Date().getFullYear()} PetAdopt Inc. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer
