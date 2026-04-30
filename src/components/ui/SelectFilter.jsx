import { useState, useRef, useEffect } from "react";
import ChevronDown from "../../assets/ChevronDown.svg";

const SelectFilter = ({ value, onChange, options = [] }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const selected =
        options.find(opt => opt.value === value) ||
        options[0] ||
        { label: "" };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative w-full sm:w-52">
            <button
                type="button"
                onClick={() => setOpen(prev => !prev)}
                className="w-full h-10 px-3 flex items-center justify-between text-sm rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
                <span className="truncate">
                    {selected.label}
                </span>

                <img
                    src={ChevronDown}
                    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    alt=""
                />
            </button>

            {open && options.length > 0 && (
                <div className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {options.map((opt) => {
                        const isActive = opt.value === value;

                        return (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                    onChange(opt.value);
                                    setOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-sm transition-colors
                                    ${isActive
                                        ? "bg-indigo-50 text-indigo-600"
                                        : "text-slate-600 hover:bg-slate-50"
                                    }`}
                            >
                                {opt.label}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SelectFilter;
