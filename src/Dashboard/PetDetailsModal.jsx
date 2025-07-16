// import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";


const PetDetailsModal = ({ pet, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-black"
                >
                    <X />
                </button>
                <h3 className="text-xl font-bold mb-4">{pet.name} Details</h3>
                <p><strong>Type:</strong> {pet.type}</p>
                <p><strong>Age:</strong> {pet.age}</p>
                <p><strong>Status:</strong> {pet.status}</p>
                <p><strong>Short Description:</strong> {pet.shortDescription}</p>
                <p><strong>Long Description:</strong> {pet.longDescription}</p>
            </div>
        </div>
    );
};

export default PetDetailsModal;
