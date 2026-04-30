import AnalyticsMetrics from "../components/analytics/AnalyticsMetrics";
import InsightsPanel from "../components/analytics/InsightsPanel";
import AnalyticsRevenueChart from "../components/analytics/AnalyticsRevenueChart";
import RevenueUsersChart from "../components/analytics/RevenueUsersChart";
import PlanDistributionChart from "../components/analytics/PlanDistributionChart";

import { useEffect, useState } from "react";
import { transactionsData } from "../services/mockData";
import SectionCard from "../components/layout/SectionCard";
import { useDispatch, useSelector } from "react-redux";
import { loadAnalyticsData } from "../features/analytics/analyticsSlice";
import Skeleton from "../components/ui/Skeleton";
import { usePlan } from "../context/PlanContext";
import LockedOverlay from "../components/ui/LockedOverlay";
import ChevronDown from '../assets/ChevronDown.svg';
import { fillMissingDates } from "../utils/fillMissingValues";
import { filterTransactions } from "../utils/filterTransactions";
import SelectFilter from "../components/ui/SelectFilter";

const Analytics = () => {
    const { plan } = usePlan();

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.analytics);

    const [dateRange, setDateRange] = useState("30");
    const dateRangeDays = Number(dateRange);

    const filteredTransactions = filterTransactions(transactionsData, {
        plan: "",
        status: "",
        search: "",
        dateRange
    });

    const totalRevenue = filteredTransactions.reduce(
        (sum, item) => sum + item.revenue,
        0
    );

    const totalCustomers = filteredTransactions.length;

    const activeCustomers = filteredTransactions.filter(
        (item) => item.status === "Active"
    ).length;

    const churnRate = totalCustomers
        ? (((totalCustomers - activeCustomers) / totalCustomers) * 100).toFixed(1)
        : 0;

    const arpu = totalCustomers
        ? Math.round(totalRevenue / totalCustomers)
        : 0;

    const cac = Math.round(arpu * 0.5);
    const ltv = arpu * 4;

    const dynamicMetrics = [
        {
            title: "Monthly Recurring Revenue",
            value: `₹${totalRevenue}`,
            change: "",
            positive: true
        },
        {
            title: "Churn Rate",
            value: `${churnRate}%`,
            change: "",
            positive: churnRate < 5
        },
        {
            title: "ARPU",
            value: `₹${arpu}`,
            change: "",
            positive: true
        },
        {
            title: "Customer Lifetime Value",
            value: `₹${ltv}`,
            change: "",
            positive: true
        },
        {
            title: "Customer Acquisition Cost",
            value: `₹${cac}`,
            change: "",
            positive: true
        }
    ];

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
        dateRangeDays
    );

    const rawRevenueUsersData = Object.values(
        filteredTransactions.reduce((acc, item) => {
            if (!acc[item.date]) {
                acc[item.date] = {
                    date: item.date,
                    revenue: 0,
                    users: 0
                };
            }

            acc[item.date].revenue += item.revenue;
            acc[item.date].users += 1;

            return acc;
        }, {})
    );

    const revenueUsersChartData = fillMissingDates(
        rawRevenueUsersData,
        "revenue",
        dateRangeDays
    ).map((item) => ({
        ...item,
        users:
            rawRevenueUsersData.find(d => d.date === item.date)?.users || 0
    }));

    const planDistributionData = Object.values(
        filteredTransactions.reduce((acc, item) => {
            if (!acc[item.plan]) {
                acc[item.plan] = { name: item.plan, value: 0 };
            }

            acc[item.plan].value += 1;
            return acc;
        }, {})
    );

    useEffect(() => {
        dispatch(loadAnalyticsData());
    }, [dispatch]);

    return (
        <main className="p-4 sm:p-6">
            <SectionCard
                title="Analytics"
                description="Deep insights into business performance"
            />

            <AnalyticsMetrics metrics={dynamicMetrics} />

            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6">
                <div className="flex flex-wrap gap-3">
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

            <div className="relative bg-white p-5 rounded-xl shadow-sm border border-slate-200 mb-6">
                {plan.analyticsLocked && (
                    <LockedOverlay message={`Analytics charts are locked on ${plan.name} plan`} />
                )}

                <h3 className="text-sm font-medium text-slate-600 mb-4">
                    Revenue Trend
                </h3>

                <div className="h-56 sm:h-64">
                    {loading ? (
                        <Skeleton className="h-full" />
                    ) : (
                        <AnalyticsRevenueChart
                            data={revenueChartData}
                            dateRange={dateRange}
                        />
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                <div className="relative bg-white p-5 rounded-xl shadow-sm border border-slate-200 lg:col-span-2">
                    {plan.analyticsLocked && (
                        <LockedOverlay message="Revenue vs Users chart is locked" />
                    )}

                    <h3 className="text-sm font-medium text-slate-600 mb-4">
                        Revenue vs Users
                    </h3>

                    <div className="h-56 sm:h-64">
                        {loading ? (
                            <Skeleton className="h-full" />
                        ) : (
                            <RevenueUsersChart
                                data={revenueUsersChartData}
                                dateRange={dateRange}
                            />
                        )}
                    </div>
                </div>

                <div className="relative bg-white p-5 rounded-xl shadow-sm border border-slate-200 lg:col-span-1">
                    {(plan.analyticsLocked || plan.planDistLocked) && (
                        <LockedOverlay message="Plan Distribution chart is locked" />
                    )}

                    <h3 className="text-sm font-medium text-slate-600 mb-4">
                        Plan Distribution
                    </h3>

                    <div className="h-56 sm:h-64">
                        {loading ? (
                            <Skeleton className="h-full" />
                        ) : (
                            <PlanDistributionChart
                                data={planDistributionData}
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

export default Analytics;
