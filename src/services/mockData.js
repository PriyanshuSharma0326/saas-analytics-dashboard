const formatDate = (date) => date.toISOString().split("T")[0];

const generateDates = (days) => {
    const data = [];

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);

        data.push({
            date: formatDate(date)
        });
    }

    return data;
};

const getRollingData = (key, generator, totalDays = 180) => {
    const stored = localStorage.getItem(key);

    if (!stored) {
        const fresh = generator(totalDays);
        localStorage.setItem(key, JSON.stringify(fresh));
        return fresh;
    }

    let data = JSON.parse(stored);

    if (!data || data.length === 0) {
        const fresh = generator(totalDays);
        localStorage.setItem(key, JSON.stringify(fresh));
        return fresh;
    }

    const lastDate = new Date(data[data.length - 1].date);
    const today = new Date();

    const diffDays = Math.floor(
        (today - lastDate) / (1000 * 60 * 60 * 24)
    );

    if (diffDays <= 0) return data;

    for (let i = 1; i <= diffDays; i++) {
        const date = new Date(lastDate);
        date.setDate(date.getDate() + i);

        const prev = data[data.length - 1];

        data.push({
            date: date.toISOString().split("T")[0],
            ...generator(1, prev)[0]
        });
    }

    data = data.slice(-totalDays);

    localStorage.setItem(key, JSON.stringify(data));

    return data;
};

const generateTransactionsForDate = (date) => {
    const count = Math.floor(1 + Math.random() * 5);

    return Array.from({ length: count }, (_, i) => ({
        id: `${date}-${i}-${Math.random()}`,
        name: `Company ${Math.floor(Math.random() * 100)}`,
        plan: ["Basic", "Pro", "Enterprise"][
            Math.floor(Math.random() * 3)
        ],
        revenue: Math.floor(5000 + Math.random() * 100000),
        status: ["Active", "Inactive", "Pending"][
            Math.floor(Math.random() * 3)
        ],
        date
    }));
};

const getRollingTransactions = (key, totalDays = 180) => {
    const stored = localStorage.getItem(key);
    const today = new Date();

    if (!stored) {
        const data = [];

        for (let i = totalDays - 1; i >= 0; i--) {
            const date = new Date();
            date.setDate(today.getDate() - i);

            const dateStr = formatDate(date);
            data.push(...generateTransactionsForDate(dateStr));
        }

        localStorage.setItem(key, JSON.stringify(data));
        return data;
    }

    let data = JSON.parse(stored);

    const lastDate = new Date(
        data[data.length - 1].date
    );

    const diffDays = Math.floor(
        (today - lastDate) / (1000 * 60 * 60 * 24)
    );

    if (diffDays <= 0) return data;

    for (let i = 1; i <= diffDays; i++) {
        const date = new Date(lastDate);
        date.setDate(date.getDate() + i);

        const dateStr = formatDate(date);
        data.push(...generateTransactionsForDate(dateStr));
    }

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - totalDays);

    data = data.filter(
        (item) => new Date(item.date) >= cutoff
    );

    localStorage.setItem(key, JSON.stringify(data));

    return data;
};

export const revenueData = getRollingData(
    "revenueData",
    (days, prev) => {
        if (!prev) {
            return generateDates(days).map((d) => ({
                ...d,
                revenue: Math.floor(800 + Math.random() * 2500)
            }));
        }

        return [
            {
                revenue: Math.max(
                    500,
                    prev.revenue +
                        Math.floor(Math.random() * 400 - 200)
                )
            }
        ];
    }
);

export const userGrowthData = getRollingData(
    "userGrowthData",
    (days, prev) => {
        if (!prev) {
            return generateDates(days).map((d) => ({
                ...d,
                users: Math.floor(2 + Math.random() * 10)
            }));
        }

        return [
            {
                users: Math.max(
                    1,
                    prev.users +
                        Math.floor(Math.random() * 4 - 2)
                )
            }
        ];
    }
);

const revenueUsersData = getRollingData(
    "revenueUsersData",
    (days, prev) => {
        if (!prev) {
            return generateDates(days).map((d) => ({
                ...d,
                revenue: Math.floor(40000 + Math.random() * 70000),
                users: Math.floor(300 + Math.random() * 500),
                month: new Date(d.date).toLocaleString(
                    "default",
                    { month: "short" }
                )
            }));
        }

        return [
            {
                revenue: Math.max(
                    20000,
                    prev.revenue +
                        Math.floor(Math.random() * 8000 - 4000)
                ),
                users: Math.max(
                    100,
                    prev.users +
                        Math.floor(Math.random() * 50 - 25)
                ),
                month: new Date().toLocaleString("default", {
                    month: "short"
                })
            }
        ];
    }
);

const transactionsData = getRollingTransactions(
    "transactionsData",
    180
);

const analyticsMetrics = [
    { title: "Monthly Recurring Revenue", value: "₹2,48,000", change: "+12.4%", positive: true },
    { title: "Churn Rate", value: "3.2%", change: "-0.8%", positive: true },
    { title: "ARPU", value: "₹4,320", change: "+5.1%", positive: true },
    { title: "Customer Lifetime Value", value: "₹18,900", change: "+9.3%", positive: true },
    { title: "Customer Acquisition Cost", value: "₹2,140", change: "-2.7%", positive: true },
];

const analyticsInsights = [
    "Revenue growth primarily driven by Pro tier subscriptions.",
    "Churn rate improving, indicating better customer retention.",
    "ARPU increasing steadily over the last 6 months.",
    "Enterprise customers contributing highest lifetime value.",
    "Customer acquisition cost trending downward.",
];

export {
    revenueUsersData,
    transactionsData,
    analyticsMetrics,
    analyticsInsights
}
