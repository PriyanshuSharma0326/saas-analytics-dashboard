import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend
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

const RevenueUsersChart = ({ data = [], dateRange = "30" }) => {
    if (!data.length) return null;

    const tickCount = dateRange === "7" ? 7 : 6;
    const ticks = buildTicks(data, tickCount);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />

                <XAxis
                    dataKey="date"
                    ticks={ticks}
                    domain={["dataMin", todayStr]}
                    tickFormatter={(d) => formatTick(d, dateRange)}
                    tick={{ fontSize: 11 }}
                />

                <YAxis
                    yAxisId="left"
                    tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                    tick={{ fontSize: 11 }}
                    width={45}
                />

                <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 11 }}
                    width={35}
                />

                <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "rgba(99,102,241,0.06)" }}
                />

                <Legend content={<CustomLegend />} />

                <Bar
                    yAxisId="right"
                    dataKey="users"
                    fill="#818cf8"
                    radius={[6, 6, 0, 0]}
                    name="Users"
                />

                <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#6366f1"
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                    name="Revenue"
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;

    return (
        <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg px-3 py-2 shadow-md text-xs">
            <p className="text-slate-500 dark:text-gray-400 mb-2">
                {new Date(label).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", year: "numeric"
                })}
            </p>
            {payload.map((entry) => (
                <p
                    key={entry.name}
                    className="font-semibold"
                    style={{ color: entry.color }}
                >
                    {entry.name === "Revenue"
                        ? `₹${entry.value.toLocaleString()}`
                        : entry.value
                    } {entry.name}
                </p>
            ))}
        </div>
    );
};

const CustomLegend = ({ payload }) => (
    <div className="flex justify-center gap-4 mt-1">
        {payload.map((entry) => (
            <div key={entry.value} className="flex items-center gap-1.5">
                <span
                    className="inline-block w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: entry.color }}
                />
                <span className="text-xs text-slate-600 dark:text-gray-400">
                    {entry.value}
                </span>
            </div>
        ))}
    </div>
);

export default RevenueUsersChart;