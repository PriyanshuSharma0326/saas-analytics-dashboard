import KpiCard from "./KpiCard";

const DeltaBadge = ({ value }) => {
    const isPositive = Number(value) >= 0;
    return (
        <span className={`text-xs px-2 py-1 rounded-md font-medium ${isPositive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
            {isPositive ? "↑" : "↓"} {Math.abs(value)}%
        </span>
    );
};

const MetricsGrid = ({
    totalRevenue, activeCustomers, avgRevenue, conversionRate,
    revenueDelta, customersDelta, avgRevenueDelta, conversionDelta
}) => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
                title="Total Revenue"
                value={totalRevenue}
                isCurrency
                change={<DeltaBadge value={revenueDelta} />}
            />

            <KpiCard
                title="Active Customers"
                value={activeCustomers}
                change={<DeltaBadge value={customersDelta} />}
            />

            <KpiCard
                title="Avg Revenue"
                value={avgRevenue}
                isCurrency
                change={<DeltaBadge value={avgRevenueDelta} />}
            />

            <KpiCard
                title="Conversion Rate"
                value={conversionRate}
                change={<DeltaBadge value={conversionDelta} />}
            />
        </div>
    );
};

export default MetricsGrid;
