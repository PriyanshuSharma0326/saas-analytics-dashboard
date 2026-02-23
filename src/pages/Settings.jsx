import SectionCard from "../components/layout/SectionCard";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import Skeleton from "../components/ui/Skeleton";

const Settings = () => {
    const { user, loading } = useAuth();
    const { darkMode, toggleDarkMode } = useTheme();

    const [profile, setProfile] = useState(() => ({
        name: user?.displayName || "",
        email: user?.email || ""
    }));

    const [preferences, setPreferences] = useState({
        notifications: true,
        darkMode: darkMode,
        autoUpdates: true
    });

    if (loading) {
        return (
            <main className="p-4 sm:p-6">
                <Skeleton className="h-16 mb-6" />
                <Skeleton className="h-40" />
            </main>
        );
    }

    return (
        <main className="p-4 sm:p-6">
            <SectionCard
                title="Settings"
                description="Manage your workspace preferences"
            />

            <div className="space-y-4 sm:space-y-6">
                <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-sm font-medium text-slate-700 mb-4">
                        Profile Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            label="Full Name"
                            value={profile.name}
                            onChange={(e) =>
                                setProfile(prev => ({ ...prev, name: e.target.value }))
                            }
                        />
                        <Input
                            label="Email Address"
                            value={profile.email}
                            disabled
                        />
                    </div>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-sm font-medium text-slate-700 mb-4">
                        Preferences
                    </h3>

                    <div className="space-y-3">
                        <Toggle
                            label="Enable Notifications"
                            checked={preferences.notifications}
                            onChange={() =>
                                setPreferences(prev => ({ ...prev, notifications: !prev.notifications }))
                            }
                        />

                        <Toggle
                            label="Dark Mode"
                            checked={preferences.darkMode}
                            onChange={() => {
                                setPreferences(prev => ({ ...prev, darkMode: !prev.darkMode }));
                                toggleDarkMode();
                            }}
                        />

                        <Toggle
                            label="Automatic Updates"
                            checked={preferences.autoUpdates}
                            onChange={() =>
                                setPreferences(prev => ({ ...prev, autoUpdates: !prev.autoUpdates }))
                            }
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

const Input = ({ label, ...props }) => (
    <div>
        <label className="text-xs text-slate-500 block mb-1">
            {label}
        </label>

        <input
            {...props}
            className="
                w-full h-10 px-3 text-sm
                rounded-lg border border-slate-200
                bg-white shadow-sm
                focus:outline-none focus:ring-2
                focus:ring-indigo-500/20
                focus:border-indigo-400
                disabled:bg-slate-50 disabled:text-slate-400
            "
        />
    </div>
);

const Toggle = ({ label, checked, onChange }) => (
    <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="accent-indigo-600"
        />
        {label}
    </label>
);

export default Settings;
