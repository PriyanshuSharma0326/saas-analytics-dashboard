import { analyticsMetrics } from "../../services/mockData";
import useCountUp from "../../hooks/useCountUp";

const AnalyticsMetrics = () => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {analyticsMetrics.map((metric) => (
                <MetricItem key={metric.title} metric={metric} />
            ))}
        </div>
    );
};

const MetricItem = ({ metric }) => {
    const extractNumber = (value) =>
        Number(String(value).replace(/[^0-9.]/g, ""));

    const getDecimals = (value) => {
        const match = String(value).match(/\.(\d+)/);
        return match ? match[1].length : 0;
    };

    const formatValue = (raw, animated) => {
        if (raw.includes("₹")) {
            return `₹${Number(animated).toLocaleString("en-IN")}`;
        }

        if (raw.includes("%")) {
            return `${animated}%`;
        }

        return animated.toLocaleString();
    };

    const numericValue = extractNumber(metric.value);
    const decimals = getDecimals(metric.value);

    const animatedValue = useCountUp(numericValue, 800, decimals);

    return (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 transition-all duration-300 ease-out hover:shadow-md hover:-translate-y-0.5">
            <p className="text-xs text-slate-500">
                {metric.title}
            </p>

            <h3 className="text-lg font-semibold text-slate-900 mt-1">
                {formatValue(metric.value, animatedValue)}
            </h3>

            <p className={`text-xs mt-1 font-medium ${metric.positive ? "text-emerald-600" : "text-red-500"}`}>
                {metric.change}
            </p>
        </div>
    );
};

export default AnalyticsMetrics;
