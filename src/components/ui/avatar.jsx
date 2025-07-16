import * as React from "react";


export function Avatar({ children, className }) {
    return (
        <div className={`relative inline-flex h-10 w-10 overflow-hidden rounded-full ${className}`}>
            {children}
        </div>
    );
}

export function AvatarImage({ src, alt }) {
    return (
        <Avatar>

            <AvatarImage src="https://i.ibb.co/x3VwLkL/pet.jpg" alt="Pet" />
        </Avatar>
    );
}
