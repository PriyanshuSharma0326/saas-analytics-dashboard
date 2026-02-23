import { useNavigate } from "react-router-dom";

const LockedOverlay = ({ message = "Upgrade to unlock this feature" }) => {
    const navigate = useNavigate();

    return (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl backdrop-blur-sm bg-white/60">
            <div className="flex flex-col items-center text-center px-6">
                <div className="w-11 h-11 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>

                <p className="text-sm font-semibold text-slate-800 mb-1">{message}</p>
                
                <p className="text-xs text-slate-500 mb-4">
                    Upgrade your plan to access this feature
                </p>

                <button
                    onClick={() => navigate("/plans")}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                    View Plans
                </button>
            </div>
        </div>
    );
};

export default LockedOverlay;
