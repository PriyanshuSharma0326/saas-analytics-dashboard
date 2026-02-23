import { useNavigate } from "react-router-dom";
import { usePlan } from "../context/PlanContext";
import Icon from '../assets/favicon.svg';

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

const CheckIcon = () => (
    <svg className="w-4 h-4 text-indigo-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const CrossIcon = () => (
    <svg className="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const Plans = () => {
    const navigate = useNavigate();
    const { currentPlan, setCurrentPlan } = usePlan();

    const handleSelect = (key) => {
        if (key === "basic") {
            setCurrentPlan("basic");
            return;
        }
        navigate(`/checkout?plan=${key}`);
    };

    return (
        <div className="w-screen h-screen flex flex-col bg-slate-50 overflow-hidden">
            <div className="shrink-0 flex items-center justify-between px-6 sm:px-10 py-4 bg-white border-b border-slate-200 shadow-sm">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Dashboard
                </button>

                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                        <img src={Icon} alt="" />
                    </div>

                    <span className="text-sm font-semibold text-slate-800">SaaS</span>
                </div>

                <span className="text-xs text-slate-500 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1 hidden sm:inline">
                    🎉 Cancel anytime
                </span>
            </div>

            <div className="shrink-0 text-center pt-6 pb-4 px-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    Plans & Pricing
                </h1>

                <p className="text-sm text-slate-500 mt-1">
                    Choose the plan that fits your needs
                </p>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 lg:px-10 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 h-full">
                    {planDetails.map((plan) => {
                        const isActive = currentPlan === plan.key;

                        return (
                            <div
                                key={plan.key}
                                className={`relative flex flex-col bg-white rounded-2xl border shadow-sm transition-all duration-200 p-5 lg:p-6
                                    ${isActive
                                        ? "border-indigo-500 ring-2 ring-indigo-500 shadow-indigo-100"
                                        : "border-slate-200 hover:border-indigo-300 hover:shadow-md"
                                    }`}
                            >
                                {plan.badge && (
                                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap z-10">
                                        {plan.badge}
                                    </span>
                                )}

                                {isActive && (
                                    <span className="absolute top-4 right-4 bg-indigo-50 text-indigo-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                                        Current
                                    </span>
                                )}

                                <h2 className="text-base font-semibold text-slate-800 mb-1 pr-20">
                                    {plan.name}
                                </h2>

                                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                                    {plan.description}
                                </p>

                                <div className="flex items-end gap-1 mb-4">
                                    <span className="text-4xl font-bold text-slate-900 tracking-tight">
                                        {plan.price}
                                    </span>

                                    <span className="text-sm text-slate-400 mb-1">
                                        {plan.period}
                                    </span>
                                </div>

                                <div className="border-t border-slate-100 mb-4" />

                                <ul className="flex flex-col gap-2.5 flex-1">
                                    {plan.features.map((feature) => (
                                        <li key={feature.label} className="flex items-center gap-2">
                                            {feature.included ? <CheckIcon /> : <CrossIcon />}
                                            <span className={`text-xs leading-snug ${
                                                feature.included
                                                    ? "text-slate-700"
                                                    : "text-slate-400"
                                            }`}>
                                                {feature.label}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-6 shrink-0">
                                    <button
                                        onClick={() => handleSelect(plan.key)}
                                        disabled={isActive}
                                        className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200
                                            ${isActive
                                                ? "bg-indigo-50 text-indigo-400 cursor-default"
                                                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-md"
                                            }`}
                                    >
                                        {isActive
                                            ? "Current Plan"
                                            : plan.key === "basic"
                                                ? "Downgrade to Free"
                                                : `Upgrade to ${plan.name}`
                                        }
                                    </button>

                                    {plan.key !== "basic" && (
                                        <p className="text-center text-xs text-slate-400 mt-2">
                                            🔒 Secure checkout · Cancel anytime
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Plans;
