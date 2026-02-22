import { useState } from "react";
import StatusBadge from "../ui/StatusBadge";

const ITEMS_PER_PAGE = 3;

const DataTable = ({ data }) => {
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }

        setCurrentPage(1);
    };

    const sortedData = [...data].sort((a, b) => {
        if (!sortKey) return 0;

        if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;

        return 0;
    });

    const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);

    const paginatedData = sortedData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div>
            <table className="w-full text-sm">
                <thead>
                    <tr className="text-left text-slate-500 border-b">
                        <th
                            className="pb-3 cursor-pointer"
                            onClick={() => handleSort("name")}
                        >
                            Company
                        </th>

                        <th
                            className="pb-3 cursor-pointer"
                            onClick={() => handleSort("plan")}
                        >
                            Plan
                        </th>

                        <th
                            className="pb-3 cursor-pointer"
                            onClick={() => handleSort("revenue")}
                        >
                            Revenue
                        </th>

                        <th className="pb-3">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {paginatedData.length === 0 ? (
                        <tr>
                            <td colSpan="4">
                                <div className="flex flex-col items-center py-6 text-slate-500">
                                    <p className="text-sm font-medium">
                                        No results found
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1">
                                        Try adjusting your filters
                                    </p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        paginatedData.map((item) => (
                            <tr key={item.id} className="border-b last:border-none">
                                <td className="py-3 text-slate-900">
                                    {item.name}
                                </td>

                                <td className="py-3 text-slate-600">
                                    {item.plan}
                                </td>

                                <td className="py-3 text-slate-900">
                                    ₹{item.revenue.toLocaleString()}
                                </td>

                                <td className="py-3">
                                    <StatusBadge status={item.status} />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
                <button
                    className="text-sm text-slate-500 disabled:opacity-40"
                    onClick={() => setCurrentPage((p) => p - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                <div className="text-sm text-slate-500">
                    Page {currentPage} of {totalPages}
                </div>

                <button
                    className="text-sm text-indigo-600 disabled:opacity-40"
                    onClick={() => setCurrentPage((p) => p + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default DataTable;
