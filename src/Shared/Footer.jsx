// src/components/shared/Footer.jsx

import { Separator } from "@/components/ui/separator"

const Footer = () => {
    return (
        <footer className="w-full mt-10 bg-black border-t">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-muted-foreground">
                    <div>
                        <h3 className="font-semibold mb-2 text-foreground">About</h3>
                        <p>We provide modern solutions for pet adoption, delivery, and care.</p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2 text-foreground">Links</h3>
                        <ul className="space-y-1">
                            <li><a href="/" className="hover:underline">Home</a></li>
                            <li><a href="/pets" className="hover:underline">Pet Listing</a></li>
                            <li><a href="/campaigns" className="hover:underline">Donations</a></li>
                            <li><a href="/contact" className="hover:underline">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2 text-foreground">Contact</h3>
                        <p>Email: info@petadopt.com</p>
                        <p>Phone: +880 1234-567890</p>
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
