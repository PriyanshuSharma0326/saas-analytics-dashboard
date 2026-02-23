import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const ALL_COLORS = {
    Basic: "#c7d2fe",
    Pro: "#6366f1",
    Enterprise: "#312e81",
};

const PlanDistributionChart = ({ data = [], selectedPlan }) => {
    if (!data.length) return null;

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    innerRadius="45%"
                    outerRadius="65%"
                    paddingAngle={3}
                    dataKey="value"
                >
                    {data.map((entry) => (
                        <Cell
                            key={entry.name}
                            fill={ALL_COLORS[entry.name]}
                            opacity={
                                !selectedPlan || selectedPlan === entry.name
                                    ? 1
                                    : 0.2
                            }
                        />
                    ))}
                </Pie>

                <Tooltip content={<CustomTooltip />} />

                <Legend content={<CustomLegend />} verticalAlign="bottom" height={36} />
            </PieChart>
        </ResponsiveContainer>
    );
};

const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;

    return (
        <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg px-3 py-2 shadow-md text-xs">
            <p className="text-slate-500 dark:text-gray-400 mb-1">
                {payload[0].name}
            </p>

            <p className="text-slate-800 dark:text-gray-100 font-semibold">
                {payload[0].value}% Customers
            </p>
        </div>
    );
};

const CustomLegend = ({ payload }) => {
    return (
        <div className="flex justify-center gap-4 mt-2">
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
};

export default PlanDistributionChart;