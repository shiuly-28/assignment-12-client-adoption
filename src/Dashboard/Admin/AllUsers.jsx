import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, createColumnHelper } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
// import useAuth from "../../hooks/useAuth";
import { AuthContext } from "../../context/AuthContext";

const columnRole = createColumnHelper();

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    // const { darkMode } = useAuth(AuthContext);
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    const handleMakeAdmin = (id) => {
        axiosSecure.patch(`/users/admin/${id}`).then((res) => {
            if (res.data.modifiedCount > 0) {
                refetch();
            }
        });
    };

    const columns = [
        columnRole.accessor((row, index) => index + 1, {
            id: "serial",
            header: "#",
            cell: (info) => info.getValue(),
        }),
        columnRole.accessor("name", {
            header: "Name",
            cell: (info) => info.getValue(),
        }),
        columnRole.accessor("image", {
            header: "Profile Picture",
            cell: (info) => (
                <img
                    src={info.getValue()}
                    alt="user"
                    className="w-12 h-12 object-cover rounded-full"
                />
            ),
        }),
        columnRole.accessor("email", {
            header: "Email",
            cell: (info) => info.getValue(),
        }),

        columnRole.accessor("role", {
            header: "Role",
            cell: (info) => info.getValue(),
        }),
        columnRole.display({
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <Button
                    onClick={() => handleMakeAdmin(row.original._id)}
                >
                    {row.original.role === "admin" ? "Make User" : "Make Admin"}
                </Button>
            ),
        }),
    ];

    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="p-4 overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4">All Users</h2>

            <table className="table w-full border text-left">
                <thead className="bg-black text-white">
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
        </div>
    );
};

export default AllUsers;