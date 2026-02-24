import { useNavigate, useRouteError } from "react-router-dom";
import Icon from "../assets/favicon.svg";

const Error = () => {
    const navigate = useNavigate();

    let error;

    try {
        error = useRouteError();
    } catch {
        error = null;
    }

    const is404 = error?.status === 404;

    return (
        <div className="w-screen h-screen flex flex-col bg-slate-50 overflow-hidden">

            <div className="shrink-0 flex items-center justify-between px-6 sm:px-10 py-4 bg-white border-b border-slate-200 shadow-sm">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                >
                    Back to Dashboard
                </button>

                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                        <img src={Icon} alt="" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800">SaaS</span>
                </div>

                <div className="w-32 hidden sm:block" />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center px-6">

                <h1 className="text-5xl font-bold text-slate-900 mb-2">
                    {is404 ? "404" : "Oops"}
                </h1>

                <p className="text-base font-medium text-slate-700 mb-1">
                    {is404 ? "Page not found" : "Something went wrong"}
                </p>

                <p className="text-sm text-slate-400 max-w-sm mb-8">
                    {is404
                        ? "The page you're looking for doesn't exist or has been moved."
                        : error?.message || "An unexpected error occurred."}
                </p>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="h-10 px-5 text-sm font-medium rounded-xl border border-slate-200 bg-white"
                    >
                        Go Back
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="h-10 px-5 text-sm font-medium rounded-xl bg-indigo-600 text-white"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Error;
