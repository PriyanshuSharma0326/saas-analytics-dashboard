import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

const todayStr = new Date().toISOString().split("T")[0];

const buildTicks = (data, tickCount) => {
    if (!data.length) return [];
    if (data.length <= tickCount) return data.map((d) => d.date);

    const step = Math.floor((data.length - 1) / (tickCount - 1));
    return Array.from({ length: tickCount }, (_, i) => {
        const idx = Math.min(i * step, data.length - 1);
        return data[idx].date;
    });
};

const formatTick = (dateStr, dateRange) => {
    const d = new Date(dateStr);
    if (dateRange === "180") {
        return d.toLocaleDateString("en-IN", { month: "short", year: "2-digit" });
    }
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
};

const RevenueChart = ({ data, dateRange = "30" }) => {
    const tickCount = dateRange === "7" ? 7 : dateRange === "30" ? 6 : 6;
    const ticks = buildTicks(data, tickCount);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />

                <XAxis
                    dataKey="date"
                    ticks={ticks}
                    domain={["dataMin", todayStr]}
                    tickFormatter={(d) => formatTick(d, dateRange)}
                    tick={{ fontSize: 11 }}
                />
                <YAxis
                    tickFormatter={(v) =>
                        v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`
                    }
                    tick={{ fontSize: 11 }}
                    width={45}
                />

                <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ stroke: "rgba(99,102,241,0.15)", strokeWidth: 1 }}
                />

                <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#6366f1"
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;

    return (
        <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg px-3 py-2 shadow-md text-xs">
            <p className="text-slate-500 dark:text-gray-400 mb-1">
                {new Date(label).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", year: "numeric"
                })}
            </p>
            <p className="text-slate-800 dark:text-gray-100 font-semibold">
                ${payload[0].value.toLocaleString()} Revenue
            </p>
        </div>
    );
};

export default RevenueChart;
