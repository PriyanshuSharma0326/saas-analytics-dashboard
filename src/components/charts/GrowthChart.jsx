import {
    BarChart,
    Bar,
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

const GrowthChart = ({ data, dateRange = "30" }) => {
    const tickCount = dateRange === "7" ? 7 : dateRange === "30" ? 6 : 6;
    const ticks = buildTicks(data, tickCount);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />

                <XAxis
                    dataKey="date"
                    ticks={ticks}
                    domain={["dataMin", todayStr]}
                    tickFormatter={(d) => formatTick(d, dateRange)}
                    tick={{ fontSize: 11 }}
                />
                <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 11 }}
                    width={30}
                />
                <Tooltip
                    formatter={(value) => [value, "New Users"]}
                    labelFormatter={(label) =>
                        new Date(label).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                        })
                    }
                />

                <Bar
                    dataKey="users"
                    fill="#6366f1"
                    radius={[6, 6, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default GrowthChart;
