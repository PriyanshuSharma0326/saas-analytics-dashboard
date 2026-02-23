import KpiCard from "./KpiCard";
import MetricCard from "./MetricCard";

const DeltaBadge = ({ value }) => {
    const isPositive = Number(value) >= 0;

    return (
        <span className={`text-xs px-2 py-1 rounded-md font-medium ${isPositive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
            {isPositive ? "↑" : "↓"} {Math.abs(value)}%
        </span>
    );
};

const MetricsGrid = ({ totalRevenue, activeCustomers, avgRevenue, conversionRate, revenueDelta }) => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
                title="Total Revenue"
                value={totalRevenue}
                badge={<DeltaBadge value={revenueDelta} />}
                isCurrency
            />
            
            <KpiCard title="Active Customers" value={activeCustomers} change="+8.1%" />

            <KpiCard title="Avg Revenue" value={avgRevenue} change="+5.3%" isCurrency />

            <KpiCard title="Conversion Rate" value={conversionRate} suffix="%" change="+2.2%" />
        </div>
    );
};

export default MetricsGrid;
