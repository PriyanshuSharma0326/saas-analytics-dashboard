import AnalyticsMetrics from "../components/analytics/AnalyticsMetrics";
import AnalyticsRevenueChart from "../components/analytics/AnalyticsRevenueChart";
import InsightsPanel from "../components/analytics/InsightsPanel";
import RevenueUsersChart from "../components/analytics/RevenueUsersChart";
import PlanDistributionChart from "../components/analytics/PlanDistributionChart";

import { useEffect, useState } from "react";
import { revenueData, userGrowthData, transactionsData } from "../services/mockData";
import SectionCard from "../components/layout/SectionCard";
import { useDispatch, useSelector } from "react-redux";
import { loadAnalyticsData } from "../features/analytics/analyticsSlice";
import Skeleton from "../components/ui/Skeleton";

const Analytics = () => {
    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.analytics);

    const [dateRange, setDateRange] = useState("30");

    const now = new Date();
    const dateRangeDays = Number(dateRange);

    const filteredRevenueData = revenueData
        .filter((item) => {
            const diffDays = (now - new Date(item.date)) / (1000 * 60 * 60 * 24);
            return diffDays <= dateRangeDays;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const filteredRevenueUsers = filteredRevenueData.map((r) => {
        const match = userGrowthData.find((u) => u.date === r.date);
        return { date: r.date, revenue: r.revenue, users: match ? match.users : 0 };
    });

    const filteredTransactions = transactionsData.filter((item) => {
        const diffDays = (now - new Date(item.date)) / (1000 * 60 * 60 * 24);
        return diffDays <= dateRangeDays;
    });

    const total = filteredTransactions.length;

    const planCounts = filteredTransactions.reduce((acc, item) => {
        acc[item.plan] = (acc[item.plan] || 0) + 1;
        return acc;
    }, {});

    const calculatedPlanData = ["Basic", "Pro", "Enterprise"].map((plan) => ({
        name: plan,
        value: total ? Math.round(((planCounts[plan] || 0) / total) * 100) : 0,
    }));

    useEffect(() => {
        dispatch(loadAnalyticsData());
    }, [dispatch]);

    return (
        <main className="p-6">
            <SectionCard
                title="Analytics"
                description="Deep insights into business performance"
            />

            <AnalyticsMetrics />

            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6">
                <div className="flex gap-3">
                    <SelectFilter
                        value={dateRange}
                        onChange={setDateRange}
                        options={[
                            { label: "Last 7 Days", value: "7" },
                            { label: "Last 30 Days", value: "30" },
                            { label: "Last 6 Months", value: "180" },
                        ]}
                    />
                </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 mb-6">
                <h3 className="text-sm font-medium text-slate-600 mb-4">
                    Revenue Trend
                </h3>

                <div className="h-64">
                    {loading ? (
                        <Skeleton className="h-full" />
                    ) : (
                        <AnalyticsRevenueChart
                            data={filteredRevenueData}
                            dateRange={dateRange}
                        />
                    )}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 col-span-2">
                    <h3 className="text-sm font-medium text-slate-600 mb-4">
                        Revenue vs Users
                    </h3>

                    <div className="h-64">
                        {loading ? (
                            <Skeleton className="h-full" />
                        ) : (
                            <RevenueUsersChart
                                data={filteredRevenueUsers}
                                dateRange={dateRange}
                            />
                        )}
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 col-span-1">
                    <h3 className="text-sm font-medium text-slate-600 mb-4">
                        Plan Distribution
                    </h3>

                    <div className="h-64">
                        {loading ? (
                            <Skeleton className="h-full" />
                        ) : (
                            <PlanDistributionChart
                                data={calculatedPlanData}
                                selectedPlan=""
                            />
                        )}
                    </div>
                </div>
            </div>

            {error && (
                <div className="mb-6 text-sm text-red-500">{error}</div>
            )}

            <InsightsPanel />
        </main>
    );
};

const SelectFilter = ({ value, onChange, options }) => (
    <div className="relative">
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-10 pl-3 pr-10 text-sm rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm appearance-none hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
        >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
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

export default Analytics;
