import { useState } from "react";
import DataTable from "../components/table/DataTable";
import ExportModal from "../components/modals/ExportModal";

import { transactionsData } from "../services/mockData";
import { filterTransactions } from "../utils/filterTransactions";
import useCountUp from "../hooks/useCountUp";
import SectionCard from "../components/layout/SectionCard";

const Reports = () => {
    const [filters, setFilters] = useState({
        dateRange: "30",
        plan: "",
        status: "",
        search: ""
    });

    const [isExportOpen, setIsExportOpen] = useState(false);

    const filteredTransactions = filterTransactions(
        transactionsData,
        filters
    );

    const totalRevenue = filteredTransactions.reduce(
        (sum, item) => sum + item.revenue,
        0
    );

    const totalTransactions = filteredTransactions.length;

    const activeDeals = filteredTransactions.filter(
        (item) => item.status === "Active"
    ).length;

    const handleExport = (format) => {
        console.log("Exporting:", format);
        setIsExportOpen(false);
    };

    return (
        <main className="p-6">
            <SectionCard
                title="Reports"
                description="Detailed financial & performance breakdown"
            />

            <div className="grid grid-cols-3 gap-4 mb-6">
                <MetricCard label="Total Revenue" value={totalRevenue} prefix="₹" />
                <MetricCard label="Transactions" value={totalTransactions} />
                <MetricCard label="Active Deals" value={activeDeals} />
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-4 flex justify-between items-center">
                <div className="flex gap-3">
                    <input
                        placeholder="Search company..."
                        value={filters.search}
                        onChange={(e) =>
                            setFilters(prev => ({
                                ...prev,
                                search: e.target.value
                            }))
                        }
                        className="
                            h-10 px-3 text-sm rounded-lg
                            border border-slate-200
                            shadow-sm
                            focus:outline-none focus:ring-2 focus:ring-indigo-500/20
                        "
                    />

                    <SelectFilter
                        value={filters.plan}
                        onChange={(value) =>
                            setFilters(prev => ({ ...prev, plan: value }))
                        }
                        options={[
                            { label: "All Plans", value: "" },
                            { label: "Basic", value: "Basic" },
                            { label: "Pro", value: "Pro" },
                            { label: "Enterprise", value: "Enterprise" }
                        ]}
                    />

                    <SelectFilter
                        value={filters.status}
                        onChange={(value) =>
                            setFilters(prev => ({ ...prev, status: value }))
                        }
                        options={[
                            { label: "All Status", value: "" },
                            { label: "Active", value: "Active" },
                            { label: "Inactive", value: "Inactive" },
                            { label: "Pending", value: "Pending" }
                        ]}
                    />

                    <SelectFilter
                        value={filters.dateRange}
                        onChange={(value) =>
                            setFilters(prev => ({ ...prev, dateRange: value }))
                        }
                        options={[
                            { label: "Last 7 Days", value: "7" },
                            { label: "Last 30 Days", value: "30" },
                            { label: "Last 6 Months", value: "180" }
                        ]}
                    />
                </div>

                <button
                    onClick={() => setIsExportOpen(true)}
                    className="
                        text-sm font-medium text-indigo-600
                        hover:text-indigo-700 transition
                    "
                >
                    Export Report
                </button>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-sm font-medium text-slate-700 mb-4">
                    Transaction History
                </h3>

                {filteredTransactions.length ? (
                    <DataTable data={filteredTransactions} />
                ) : (
                    <div className="flex flex-col items-center py-10 text-slate-500">
                        <p className="text-sm font-medium">
                            No results found
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                            Try adjusting your filters
                        </p>
                    </div>
                )}
            </div>

            <ExportModal
                isOpen={isExportOpen}
                onClose={() => setIsExportOpen(false)}
                onExport={handleExport}
            />
        </main>
    );
};

const MetricCard = ({ label, value, prefix = "" }) => {
    const animatedValue = useCountUp(value);

    return (
        <div
            className="
                bg-white rounded-xl p-4
                shadow-sm border border-slate-200
                transition-all duration-300 ease-out
                hover:shadow-md hover:-translate-y-0.5
            "
        >
            <p className="text-xs text-slate-500">{label}</p>

            <h3 className="text-lg font-semibold text-slate-900">
                {prefix}{animatedValue.toLocaleString()}
            </h3>
        </div>
    );
};

const SelectFilter = ({ value, onChange, options }) => {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="
                    h-10 pl-3 pr-10 text-sm rounded-lg
                    border border-slate-200 bg-white text-slate-700
                    shadow-sm transition-all duration-200
                    appearance-none
                    hover:border-slate-300
                    focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
                "
            >
                {options.map((opt) => (
                    <option key={opt.label} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>

            <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        </div>
    );
};

export default Reports;
