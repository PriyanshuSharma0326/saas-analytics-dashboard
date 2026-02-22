import MetricsGrid from "../components/dashboard/MetricsGrid";
import RevenueChart from "../components/charts/RevenueChart";
import GrowthChart from "../components/charts/GrowthChart";
import Skeleton from "../components/ui/Skeleton";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDashboardData } from "../features/analytics/analyticsSlice";

import DataTable from "../components/table/DataTable";
import FilterBar from "../components/filters/FilterBar";

import { revenueData, transactionsData, userGrowthData } from "../services/mockData";
import { Link } from "react-router-dom";
import { filterTransactions } from "../utils/filterTransactions";

const getPreviousPeriodData = (data, days) => {
    const now = new Date();

    return data.filter((item) => {
        const diffDays = (now - new Date(item.date)) / (1000 * 60 * 60 * 24);

        return diffDays > days && diffDays <= days * 2;
    });
};

const Dashboard = () => {
    const dispatch = useDispatch();

    const [filters, setFilters] = useState({
        plan: "",
        status: "",
        search: "",
        dateRange: "30"
    });

    const now = new Date();
    const dateRangeDays = Number(filters.dateRange);

    const { loading, error } = useSelector((state) => state.analytics);

    const filteredTransactions = filterTransactions(transactionsData, filters);

    const totalRevenue = filteredTransactions.reduce(
        (sum, item) => sum + item.revenue,
        0
    );

    const activeCustomers = filteredTransactions.filter(
        (item) => item.status === "Active"
    ).length;

    const avgRevenue = filteredTransactions.length
        ? Math.round(totalRevenue / filteredTransactions.length)
        : 0;

    const conversionRate = filteredTransactions.length
        ? ((activeCustomers / filteredTransactions.length) * 100).toFixed(1)
        : 0;

    const filteredRevenue = revenueData
        .filter((item) => {
            const diffDays =
                (now - new Date(item.date)) / (1000 * 60 * 60 * 24);
            return diffDays <= dateRangeDays;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const filteredGrowth = userGrowthData
        .filter((item) => {
            const diffDays =
                (now - new Date(item.date)) / (1000 * 60 * 60 * 24);
            return diffDays <= dateRangeDays;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const previousTransactions = getPreviousPeriodData(
        transactionsData,
        dateRangeDays
    );

    const previousRevenue = previousTransactions.reduce(
        (sum, item) => sum + item.revenue,
        0
    );

    const revenueDelta = previousRevenue
        ? (((totalRevenue - previousRevenue) / previousRevenue) * 100).toFixed(1)
        : 0;
    
    useEffect(() => {
        dispatch(loadDashboardData());
    }, [dispatch]);

    return (
        <main className="p-6 overflow-y-auto">
            <div className="mb-6">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                    Analytics Overview
                </h2>
                <p className="text-sm text-slate-500">
                    Monitor business performance and growth metrics
                </p>
            </div>

            <FilterBar filters={filters} setFilters={setFilters} />

            <div className="mb-6">
                <MetricsGrid
                    totalRevenue={totalRevenue}
                    activeCustomers={activeCustomers}
                    avgRevenue={avgRevenue}
                    conversionRate={conversionRate}
                    revenueDelta={revenueDelta}
                />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-sm font-medium text-slate-600 mb-4">
                        Revenue Trend
                    </h3>

                    <div className="h-64">
                        {loading ? (
                            <Skeleton className="h-full" />
                        ) : (
                            <RevenueChart
                                data={filteredRevenue}
                                dateRange={filters.dateRange}
                            />
                        )}
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-sm font-medium text-slate-600 mb-4">
                        Customer Growth
                    </h3>

                    <div className="h-64">
                        {loading ? (
                            <Skeleton className="h-full" />
                        ) : (
                            <GrowthChart
                                data={filteredGrowth}
                                dateRange={filters.dateRange}
                            />
                        )}
                    </div>
                </div>
            </div>

            {error && (
                <div className="mb-6 text-sm text-red-500">{error}</div>
            )}

            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium text-slate-600">
                        Recent Transactions
                    </h3>

                    <Link to='/reports' className="text-sm text-indigo-600 hover:text-indigo-700">
                        View All
                    </Link>
                </div>

                {filteredTransactions.length ? (
                    <DataTable data={filteredTransactions} />
                ) : (
                    <div className="flex flex-col items-center py-6 text-slate-500">
                        <p className="text-sm font-medium">
                            No results found
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                            Try adjusting your filters
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Dashboard;
