import MetricsGrid from "../components/dashboard/MetricsGrid";
import RevenueChart from "../components/charts/RevenueChart";
import GrowthChart from "../components/charts/GrowthChart";
import Skeleton from "../components/ui/Skeleton";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDashboardData } from "../features/analytics/analyticsSlice";

import DataTable from "../components/table/DataTable";
import FilterBar from "../components/filters/FilterBar";

import { transactionsData } from "../services/mockData";
import { Link } from "react-router-dom";
import { filterTransactions } from "../utils/filterTransactions";
import SectionCard from "../components/layout/SectionCard";
import { fillMissingDates } from "../utils/fillMissingValues";
import { splitPeriods, calculateChange } from "../utils/analyticsHelpers";

const Dashboard = () => {
    const dispatch = useDispatch();

    const [filters, setFilters] = useState({
        plan: "",
        status: "",
        search: "",
        dateRange: "30"
    });

    const dateRangeDays = Number(filters.dateRange);

    const { loading, error } = useSelector((state) => state.analytics);

    const filteredTransactions = filterTransactions(transactionsData, filters);

    const rawRevenueData = Object.values(
        filteredTransactions.reduce((acc, item) => {
            if (!acc[item.date]) {
                acc[item.date] = { date: item.date, revenue: 0 };
            }

            acc[item.date].revenue += item.revenue;
            return acc;
        }, {})
    );

    const revenueChartData = fillMissingDates(
        rawRevenueData,
        "revenue",
        dateRangeDays,
    );

    const rawUsersData = Object.values(
        filteredTransactions.reduce((acc, item) => {
            if (!acc[item.date]) {
                acc[item.date] = { date: item.date, users: 0 };
            }

            acc[item.date].users += 1;
            return acc;
        }, {})
    );

    const usersChartData = fillMissingDates(
        rawUsersData,
        "users",
        dateRangeDays,
    );

    const { current, previous } = splitPeriods(
        transactionsData,
        dateRangeDays
    );

    const currentFiltered = filterTransactions(current, filters, false);
    const previousFiltered = filterTransactions(previous, filters, false);

    const totalRevenue = currentFiltered.reduce(
        (sum, item) => sum + item.revenue,
        0
    );

    const totalCustomers = currentFiltered.length;

    const activeCustomers = currentFiltered.filter(
        (item) => item.status === "Active"
    ).length;

    const avgRevenue = totalCustomers
        ? totalRevenue / totalCustomers
        : 0;

    const conversionRate = totalCustomers
        ? (activeCustomers / totalCustomers) * 100
        : 0;

    const prevRevenue = previousFiltered.reduce(
        (sum, item) => sum + item.revenue,
        0
    );

    const prevCustomers = previousFiltered.length;

    const prevActiveCustomers = previousFiltered.filter(
        (item) => item.status === "Active"
    ).length;

    const prevAvgRevenue = prevCustomers
        ? prevRevenue / prevCustomers
        : 0;

    const prevConversionRate = prevCustomers
        ? (prevActiveCustomers / prevCustomers) * 100
        : 0;

    const revenueDelta = calculateChange(totalRevenue, prevRevenue);
    const customersDelta = calculateChange(totalCustomers, prevCustomers);
    const avgRevenueDelta = calculateChange(avgRevenue, prevAvgRevenue);
    const conversionDelta = calculateChange(conversionRate, prevConversionRate);

    const formattedAvgRevenue = Math.round(avgRevenue);
    const formattedConversionRate = conversionRate.toFixed(1);

    useEffect(() => {
        dispatch(loadDashboardData());
    }, [dispatch]);

    return (
        <main className="p-4 sm:p-6 overflow-y-auto">
            <SectionCard
                title="Analytics Overview"
                description="Monitor business performance and growth metrics"
            />

            <FilterBar filters={filters} setFilters={setFilters} />

            <div className="mb-6">
                <MetricsGrid
                    totalRevenue={totalRevenue} 
                    activeCustomers={activeCustomers} 
                    avgRevenue={formattedAvgRevenue} 
                    conversionRate={formattedConversionRate} 
                    revenueDelta={revenueDelta} 
                    customersDelta={customersDelta} 
                    avgRevenueDelta={avgRevenueDelta} 
                    conversionDelta={conversionDelta} 
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-sm font-medium text-slate-600 mb-4">
                        Revenue Trend
                    </h3>

                    <div className="h-56 sm:h-64">
                        {loading ? (
                            <Skeleton className="h-full" />
                        ) : (
                            <RevenueChart
                                data={revenueChartData}
                                dateRange={filters.dateRange}
                            />
                        )}
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-sm font-medium text-slate-600 mb-4">
                        Customer Growth
                    </h3>

                    <div className="h-56 sm:h-64">
                        {loading ? (
                            <Skeleton className="h-full" />
                        ) : (
                            <GrowthChart
                                data={usersChartData}
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
