import { useSearchParams, useNavigate } from "react-router-dom";
import { usePlan } from "../context/PlanContext";
import { useState } from "react";
import Icon from '../assets/favicon.svg';

const PLAN_META = {
    premium: { name: "Premium", price: "₹999", period: "month" },
    super_premium: { name: "Super Premium", price: "₹2,499", period: "month" },
};

const validate = (form) => {
    const errors = {};

    if (!form.name.trim())
        errors.name = "Full name is required";

    if (!form.email.trim())
        errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        errors.email = "Enter a valid email address";

    if (!form.card.trim())
        errors.card = "Card number is required";
    else if (!/^\d{16}$/.test(form.card.replace(/\s/g, "")))
        errors.card = "Enter a valid 16-digit card number";

    if (!form.expiry.trim())
        errors.expiry = "Expiry date is required";
    else if (!/^(0[1-9]|1[0-2])\s?\/\s?\d{2}$/.test(form.expiry))
        errors.expiry = "Use MM / YY format";

    if (!form.cvv.trim())
        errors.cvv = "CVV is required";
    else if (!/^\d{3,4}$/.test(form.cvv))
        errors.cvv = "Enter a valid CVV";

    return errors;
};

const Checkout = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setCurrentPlan } = usePlan();

    const planKey = searchParams.get("plan");
    const plan = PLAN_META[planKey];

    const [form, setForm] = useState({ name: "", email: "", card: "", expiry: "", cvv: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!plan) {
        navigate("/plans");
        return null;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = () => {
        const validationErrors = validate(form);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setCurrentPlan(planKey);
            setLoading(false);
            setSuccess(true);
            setTimeout(() => navigate("/"), 2000);
        }, 1500);
    };

    return (
        <div className="w-screen h-screen flex flex-col bg-slate-50 overflow-hidden">
            <div className="shrink-0 flex items-center justify-between px-6 sm:px-10 py-4 bg-white border-b border-slate-200 shadow-sm">
                <button
                    onClick={() => navigate("/plans")}
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Plans
                </button>

                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                        <img src={Icon} alt="" />
                    </div>

                    <span className="text-sm font-semibold text-slate-800">SaaS</span>
                </div>

                <div className="w-32 hidden sm:block" />
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto flex items-start justify-center p-6 py-8">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                    {success ? (
                        <div className="flex flex-col items-center py-8 text-center">
                            <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                                <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>

                            <h2 className="text-lg font-semibold text-slate-800 mb-1">Payment Successful!</h2>

                            <p className="text-sm text-slate-500">
                                You're now on the{" "}
                                <span className="font-medium text-indigo-600">{plan.name}</span>{" "}
                                plan. Redirecting to dashboard...
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6">
                                <h1 className="text-lg font-semibold text-slate-800">Checkout</h1>

                                <p className="text-xs text-slate-500 mt-0.5">Complete your purchase</p>
                            </div>

                            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">{plan.name} Plan</p>
                                        <p className="text-xs text-slate-500">Billed monthly</p>
                                    </div>

                                    <span className="text-lg font-bold text-indigo-600">
                                        {plan.price}
                                        <span className="text-xs font-normal text-slate-400">/{plan.period}</span>
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                {[
                                    { label: "Full Name", name: "name", placeholder: "Priyanshu Sharma", type: "text" },
                                    { label: "Email Address", name: "email", placeholder: "you@example.com", type: "email" },
                                    { label: "Card Number", name: "card", placeholder: "1234 5678 9012 3456", type: "text" },
                                ].map((field) => (
                                    <div key={field.name}>
                                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                            {field.label}
                                        </label>

                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={form[field.name]}
                                            onChange={handleChange}
                                            placeholder={field.placeholder}
                                            className={`w-full h-10 px-3 text-sm rounded-lg border bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors
                                                ${errors[field.name]
                                                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-500"
                                                    : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500"
                                                }`}
                                        />
                                        {errors[field.name] && (
                                            <p className="text-xs text-red-500 mt-1">{errors[field.name]}</p>
                                        )}
                                    </div>
                                ))}

                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { label: "Expiry Date", name: "expiry", placeholder: "MM / YY" },
                                        { label: "CVV", name: "cvv", placeholder: "123" },
                                    ].map((field) => (
                                        <div key={field.name}>
                                            <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                                {field.label}
                                            </label>

                                            <input
                                                type="text"
                                                name={field.name}
                                                value={form[field.name]}
                                                onChange={handleChange}
                                                placeholder={field.placeholder}
                                                className={`w-full h-10 px-3 text-sm rounded-lg border bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors
                                                    ${errors[field.name]
                                                        ? "border-red-400 focus:ring-red-500/20 focus:border-red-500"
                                                        : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500"
                                                    }`}
                                            />
                                            {errors[field.name] && (
                                                <p className="text-xs text-red-500 mt-1">{errors[field.name]}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="w-full mt-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                            </svg>
                                            Processing...
                                        </>
                                    ) : (
                                        `Pay ${plan.price}`
                                    )}
                                </button>

                                <p className="text-center text-xs text-slate-400">
                                    🔒 Secured by Stripe · Cancel anytime
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Checkout;
