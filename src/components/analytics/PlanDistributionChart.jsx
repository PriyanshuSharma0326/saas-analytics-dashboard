import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const ALL_COLORS = {
    Basic: "#c7d2fe",
    Pro: "#6366f1",
    Enterprise: "#312e81",
};

const PlanDistributionChart = ({ data, selectedPlan }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    innerRadius={70}
                    outerRadius={100}
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

                <Tooltip formatter={(value) => [`${value}%`, "Customers"]} />
                <Legend verticalAlign="bottom" height={36} />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default PlanDistributionChart;
