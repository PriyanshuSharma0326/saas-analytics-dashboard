import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window === "undefined") return false;

        const saved = localStorage.getItem("darkMode");
        const isDark = saved ? JSON.parse(saved) : false;

        if (isDark) {
            document.documentElement.classList.add("dark");
        }

        return isDark;
    });

    const toggleDarkMode = () => {
        setDarkMode(prev => {
            const next = !prev;

            if (next) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }

            localStorage.setItem("darkMode", JSON.stringify(next));

            return next;
        });
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};
