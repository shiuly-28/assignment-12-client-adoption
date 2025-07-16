import React from "react";


export const Textarea = ({ value, onChange, placeholder, name, ...props }) => {
    return (
        <textarea
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[100px]"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            name={name}
            {...props}
        />
    );
};
