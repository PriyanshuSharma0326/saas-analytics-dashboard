import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../services/firebase";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import Icon from '../assets/favicon.svg';
import Google from '../assets/Google.svg';
import Spinner from '../assets/Spinner.svg';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        try {
            setLoading(true);
            await signInWithPopup(auth, provider);
            setLoading(false);
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/");
            }
        });

        return unsubscribe;
    }, [navigate]);

    return (
        <div className="no-dark min-h-screen bg-[#eef2ff] flex">
            <div className="hidden lg:flex flex-col justify-between w-[480px] shrink-0 bg-indigo-600 p-10 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-80 h-80 bg-indigo-500 rounded-full opacity-40" />

                    <div className="absolute top-1/2 -right-20 w-64 h-64 bg-indigo-700 rounded-full opacity-30" />

                    <div className="absolute -bottom-16 left-10 w-48 h-48 bg-violet-500 rounded-full opacity-20" />

                    <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="g" width="48" height="48" patternUnits="userSpaceOnUse">
                                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.8" />
                            </pattern>
                        </defs>

                        <rect width="100%" height="100%" fill="url(#g)" />
                    </svg>
                </div>

                <div className="relative flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md">
                        <img src={Icon} alt="" />
                    </div>

                    <span className="text-white font-semibold text-lg tracking-tight">SaaS Dashboard</span>
                </div>

                <div className="relative space-y-6">
                    <div className="space-y-3">
                        <p className="text-indigo-200 text-sm font-medium uppercase tracking-widest">Analytics Platform</p>

                        <h1 className="text-white text-4xl font-bold leading-tight tracking-tight">
                            Monitor business<br />
                            insights &amp;<br />
                            performance.
                        </h1>

                        <p className="text-indigo-200 text-sm leading-relaxed max-w-xs">
                            Track revenue trends, customer growth, and conversion metrics — all in one place.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                        {[
                            { label: "Total Revenue", value: "₹15.8L" },
                            { label: "Active Customers", value: "33" },
                            { label: "Avg Revenue", value: "₹47,909" },
                            { label: "Conversion Rate", value: "100%" },
                        ].map((s) => (
                            <div key={s.label} className="bg-white/10 border border-white/20 rounded-xl px-4 py-3">
                                <p className="text-white font-bold text-lg leading-none">{s.value}</p>

                                <p className="text-indigo-200 text-xs mt-1">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="relative text-indigo-300 text-xs">
                    © 2026 SaaS Dashboard · Built by Priyanshu Sharma
                </p>
            </div>

            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-sm">
                    <div className="flex lg:hidden items-center gap-2.5 mb-8">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <img src={Icon} alt="" />
                        </div>

                        <span className="text-slate-800 font-semibold text-base">SaaS Dashboard</span>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-8">

                        <div className="mb-7">
                            <h2 className="text-slate-900 text-2xl font-bold tracking-tight">Welcome back</h2>

                            <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">
                                Sign in to access your analytics dashboard.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 mb-5">
                            <div className="flex-1 h-px bg-slate-100" />

                            <span className="text-slate-400 text-xs font-medium">Continue with</span>

                            <div className="flex-1 h-px bg-slate-100" />
                        </div>

                        <button
                            onClick={handleGoogleSignIn} 
                            disabled={loading} 
                            className="w-full h-11 flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-700 transition-all duration-150 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed" 
                        >
                            {loading ? (
                                <img src={Spinner} alt="" />
                            ) : (
                                <>
                                    <img src={Google} alt="" />
                                    Continue with Google
                                </>
                            )}
                        </button>
                    </div>

                    <p className="text-center text-slate-400 text-xs mt-5">
                        Secure authentication powered by Google OAuth
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
