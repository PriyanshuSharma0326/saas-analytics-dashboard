import { useState } from "react";
import DataTable from "../components/table/DataTable";
import ExportModal from "../components/modals/ExportModal";
import ChevronDown from '../assets/ChevronDown.svg';

import { transactionsData } from "../services/mockData";
import { filterTransactions } from "../utils/filterTransactions";
import useCountUp from "../hooks/useCountUp";
import SectionCard from "../components/layout/SectionCard";
import FilterBar from "../components/filters/FilterBar";
import { exportToCsv, exportToJson } from "../utils/exportHelpers";

const Reports = () => {
    const [filters, setFilters] = useState({
        dateRange: "30",
        plan: "",
        status: "",
        search: ""
    });

    const [isExportOpen, setIsExportOpen] = useState(false);

    const filteredTransactions = filterTransactions(transactionsData, filters);

    const totalRevenue = filteredTransactions.reduce(
        (sum, item) => sum + item.revenue, 0
    );

    const totalTransactions = filteredTransactions.length;

    const activeDeals = filteredTransactions.filter(
        (item) => item.status === "Active"
    ).length;

    const handleExport = (format) => {
        if (!filteredTransactions.length) return;

        const date = new Date().toISOString().split("T")[0];

        if (format === "csv") {
            exportToCsv(filteredTransactions, `report-${date}.csv`);
        }
        if (format === "json") {
            exportToJson(filteredTransactions, `report-${date}.json`);
        }

        setIsExportOpen(false);
    };

    return (
        <main className="p-4 sm:p-6">
            <SectionCard
                title="Reports"
                description="Detailed financial & performance breakdown"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <MetricCard label="Total Revenue" value={totalRevenue} prefix="₹" />

                <MetricCard label="Transactions" value={totalTransactions} />

                <MetricCard label="Active Deals" value={activeDeals} />
            </div>

            <FilterBar
                filters={filters}
                setFilters={setFilters}
                rightContent={
                    <button
                        onClick={() => setIsExportOpen(true)}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                    >
                        Export Report
                    </button>
                }
            />

            <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-sm font-medium text-slate-700 mb-4">
                    Transaction History
                </h3>

                {filteredTransactions.length ? (
                    <DataTable data={filteredTransactions} ITEMS_PER_PAGE={10} />
                ) : (
                    <div className="flex flex-col items-center py-10 text-slate-500">
                        <p className="text-sm font-medium">No results found</p>

                        <p className="text-xs text-slate-400 mt-1">Try adjusting your filters</p>
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
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 transition-all duration-300 ease-out hover:shadow-md hover:-translate-y-0.5">
            <p className="text-xs text-slate-500">{label}</p>

            <h3 className="text-lg font-semibold text-slate-900">
                {prefix}{animatedValue.toLocaleString()}
            </h3>
        </div>
    );
};

export default Reports;
