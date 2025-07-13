import { useEffect, useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useAuth } from "../hooks/useAuth";

const columnHelper = createColumnHelper();

const MyPets = () => {
    const { user } = useAuth();
    const [myPets, setMyPets] = useState([]);
    const [sorting, setSorting] = useState([]);

    // Fetch user's pets
    useEffect(() => {
        if (!user?.email) return;
        axios
            .get(`http://localhost:5000/api/mypets?email=${user.email}`)
            .then((res) => setMyPets(res.data))
            .catch((err) => console.error("Failed to load pets:", err));
    }, [user]);

    // Handle delete
    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this pet?");
        if (!confirm) return;

        try {
            const res = await axios.delete(`http://localhost:5000/api/pets/${id}`);
            if (res.data.deletedCount > 0) {
                alert("Pet deleted successfully");
                setMyPets((prev) => prev.filter((p) => p._id !== id));
            }
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    // Handle adopt
    const handleAdopt = async (id) => {
        try {
            const res = await axios.patch(`http://localhost:5000/api/pets/${id}`, {
                adopted: true,
            });
            if (res.data.modifiedCount > 0) {
                alert("Pet marked as adopted");
                setMyPets((pets) =>
                    pets.map((p) => (p._id === id ? { ...p, adopted: true } : p))
                );
            }
        } catch (err) {
            console.error("Adopt update failed:", err);
        }
    };

    // Columns
    const columns = [
        columnHelper.accessor((row, index) => index + 1, {
            id: "serial",
            header: "#",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("name", {
            header: "Pet Name",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("category", {
            header: "Category",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("image", {
            header: "Image",
            cell: (info) => (
                <img
                    src={info.getValue()}
                    alt="pet"
                    className="w-12 h-12 object-cover rounded"
                />
            ),
        }),
        columnHelper.accessor("adopted", {
            header: "Status",
            cell: (info) =>
                info.getValue() ? (
                    <span className="text-green-600 font-medium">Adopted</span>
                ) : (
                    <span className="text-yellow-600 font-medium">Not Adopted</span>
                ),
        }),
        columnHelper.display({
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex flex-wrap gap-1">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                            window.location.assign(`/dashboard/update-pet/${row.original._id}`)
                        }
                    >
                        Update
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(row.original._id)}
                    >
                        Delete
                    </Button>
                    {!row.original.adopted && (
                        <Button size="sm" onClick={() => handleAdopt(row.original._id)}>
                            Mark Adopted
                        </Button>
                    )}
                </div>
            ),
        }),
    ];

    const table = useReactTable({
        data: myPets,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 10,
            },
        },
    });

    return (
        <div className="p-4 overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4">🐾 My Added Pets</h2>

            <table className="table w-full border text-left">
                <thead className="bg-gray-100">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className="p-2 cursor-pointer select-none"
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {{
                                        asc: " 🔼",
                                        desc: " 🔽",
                                    }[header.column.getIsSorted()] ?? ""}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="border-b">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="p-2">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* ✅ Pagination controls (shadcn style) */}
            {table.getPageCount() > 1 && (
                <div className="flex items-center justify-between mt-6">
                    <Button
                        variant="outline"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>

                    <div>
                        Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{" "}
                        <strong>{table.getPageCount()}</strong>
                    </div>

                    <Button
                        variant="outline"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
};

export default MyPets;
