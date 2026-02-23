import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const getInitials = (name) => {
    if (!name) return "";
    return name
        .trim()
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase() || "")
        .join("");
};

const headerConfig = {
    "/": {
        label: "Dashboard",
        title: "Analytics Overview",
        description: "Monitor business insights & performance",
    },
    "/reports": {
        label: "Reports",
        title: "Financial Reports",
        description: "Review transactions and export data",
    },
    "/analytics": {
        label: "Analytics",
        title: "Performance Insights",
        description: "Deep-dive into growth and engagement",
    },
    "/settings": {
        label: "Settings",
        title: "Workspace Preferences",
        description: "Manage your account and configuration",
    },
};

const BellIcon = () => (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);

const SearchIcon = () => (
    <svg className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
    </svg>
);

const Header = ({ onMenuClick }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { darkMode, toggleDarkMode } = useTheme();

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const current = headerConfig[location.pathname] || {
        label: "Dashboard",
        title: "Overview",
        description: "Welcome back",
    };

    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };

    const go = (path) => {
        navigate(path);
        setOpen(false);
    };

    return (
        <header className="bg-white backdrop-blur-md border-b border-indigo-100 sticky top-0 z-20">
            <div className="h-[68px] px-4 sm:px-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">

                    <button
                        onClick={onMenuClick}
                        className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-500 transition-all duration-150 shrink-0"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-[10px] font-medium text-indigo-400 uppercase tracking-widest">
                                {current.label}
                            </span>
                        </div>

                        <h1 className="text-[15px] font-semibold text-slate-800 leading-tight tracking-tight truncate">
                            {current.title}
                        </h1>
                    </div>

                    <div className="hidden md:flex items-center gap-3">
                        <div className="w-px h-6 bg-slate-200" />

                        <p className="text-xs text-slate-400 truncate">{current.description}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                    <div className="relative hidden sm:block">
                        <SearchIcon />

                        <input
                            placeholder="Search..."
                            className="h-9 pl-9 pr-4 text-sm w-48 lg:w-60
                                bg-slate-50 border border-slate-200 rounded-lg
                                text-slate-700 placeholder-slate-400
                                focus:outline-none focus:ring-2 focus:ring-indigo-500/20
                                focus:border-indigo-400 focus:bg-white
                                transition-all duration-150"
                        />
                    </div>

                    <button className="relative w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-500 transition-all duration-150 cursor-pointer">
                        <BellIcon />

                        <span className="absolute -top-1 -right-1 w-4 h-4 text-[9px] font-bold bg-indigo-500 text-white rounded-full flex items-center justify-center leading-none">
                            3
                        </span>
                    </button>

                    <div className="w-px h-6 bg-slate-200" />

                    <button
                        onClick={toggleDarkMode}
                        className="relative w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-500 transition-all duration-150 cursor-pointer"
                    >
                        {darkMode ? (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>

                    <div className="w-px h-6 bg-slate-200" />

                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setOpen((p) => !p)}
                            className="flex items-center gap-2.5 cursor-pointer group focus:outline-none"
                        >
                            <div className="w-8 h-8 rounded-lg bg-indigo-500 text-white flex items-center justify-center overflow-hidden ring-2 ring-transparent group-hover:ring-indigo-300 transition-all duration-150">
                                {user?.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt={user?.displayName || "User"}
                                        className="w-full h-full object-cover"
                                        referrerPolicy="no-referrer"
                                    />
                                ) : (
                                    <span className="text-xs font-semibold">
                                        {getInitials(user?.displayName) || "U"}
                                    </span>
                                )}
                            </div>

                            <div className="hidden lg:block text-left">
                                <p className="text-xs font-semibold text-slate-700 leading-tight">
                                    {user?.displayName?.split(" ")[0] || "User"}
                                </p>

                                <p className="text-[10px] text-slate-400 leading-tight truncate max-w-[120px]">
                                    {user?.email || ""}
                                </p>
                            </div>

                            <svg
                                className={`hidden lg:block w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {open && (
                            <div className="absolute right-0 top-[calc(100%+10px)] w-56 bg-white border border-indigo-100 rounded-xl shadow-lg shadow-slate-200/80 dark:shadow-slate-700/40 z-50 overflow-hidden">
                                <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-500 text-white flex items-center justify-center overflow-hidden shrink-0">
                                        {user?.photoURL ? (
                                            <img
                                                src={user.photoURL}
                                                alt=""
                                                className="w-full h-full object-cover"
                                                referrerPolicy="no-referrer"
                                            />
                                        ) : (
                                            <span className="text-xs font-semibold">
                                                {getInitials(user?.displayName) || "U"}
                                            </span>
                                        )}
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold text-slate-800 truncate">
                                            {user?.displayName || "User"}
                                        </p>

                                        <p className="text-[10px] text-slate-400 truncate">
                                            {user?.email || ""}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-1.5 space-y-0.5">
                                    <button
                                        onClick={() => go("/")}
                                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-100 group"
                                    >
                                        <svg className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                                        </svg>
                                        Dashboard
                                    </button>

                                    <button
                                        onClick={() => go("/settings")}
                                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-100 group"
                                    >
                                        <svg className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Settings
                                    </button>
                                </div>

                                <div className="p-1.5 border-t border-slate-100">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors duration-100"
                                    >
                                        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                        </svg>
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
