const planDetails = [
    {
        key: "basic",
        name: "Basic",
        price: "₹0",
        period: "/ month",
        description: "Get started with core dashboard metrics.",
        features: [
            { label: "Dashboard KPI cards", included: true },
            { label: "Revenue trend chart", included: true },
            { label: "Customer growth chart", included: true },
            { label: "Transaction history", included: true },
            { label: "Analytics charts", included: false },
            { label: "Reports export (CSV / JSON)", included: false },
            { label: "All charts unlocked", included: false },
        ],
    },
    {
        key: "premium",
        name: "Premium",
        price: "₹999",
        period: "/ month",
        description: "Unlock analytics with partial data visibility.",
        badge: "Popular",
        features: [
            { label: "Everything in Basic", included: true },
            { label: "Analytics charts (half data)", included: true },
            { label: "Reports export (CSV / JSON)", included: true },
            { label: "Revenue vs Users chart", included: true },
            { label: "Plan distribution chart", included: false },
            { label: "All charts fully unlocked", included: false },
            { label: "Priority support", included: false },
        ],
    },
    {
        key: "super_premium",
        name: "Super Premium",
        price: "₹2,499",
        period: "/ month",
        description: "Full access to all charts, data, and features.",
        features: [
            { label: "Everything in Premium", included: true },
            { label: "All analytics charts (full data)", included: true },
            { label: "Advanced insights panel", included: true },
            { label: "Priority support", included: true },
            { label: "Early access to new features", included: true },
        ],
    },
];

export {
    planDetails,
}
