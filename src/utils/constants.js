const planDetails = [
    {
        key: "free",
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

const PLANS = {
    free: {
        name: "Free",
        analyticsLocked: true,
        exportLocked: true,
        dateFilterLocked: false,
        planDistLocked: true,
    },
    premium: {
        name: "Premium",
        analyticsLocked: false,
        exportLocked: false,
        dateFilterLocked: false,
        planDistLocked: true,
    },
    super_premium: {
        name: "Super Premium",
        analyticsLocked: false,
        exportLocked: false,
        dateFilterLocked: false,
        planDistLocked: false,
    },
};

const PLAN_LABELS = {
    free: "Free Plan",
    premium: "Premium",
    super_premium: "Super Premium",
};

const PLAN_SUBTITLES = {
    free: "Upgrade for more features",
    premium: "Half data unlocked",
    super_premium: "Full access enabled ✓",
};
const PLAN_META = {
    premium: { name: "Premium", price: "₹999", period: "month" },
    super_premium: { name: "Super Premium", price: "₹2,499", period: "month" },
};
const PLAN_ORDER = {
    free: 0,
    premium: 1,
    super_premium: 2,
};

export {
    planDetails,
    PLANS,
    PLAN_LABELS,
    PLAN_SUBTITLES,
    PLAN_META,
    PLAN_ORDER
}
