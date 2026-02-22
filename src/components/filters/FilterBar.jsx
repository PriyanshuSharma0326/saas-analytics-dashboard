const FilterBar = ({ filters, setFilters }) => {
    const handleChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6">
            <div className="flex gap-3">
                <input
                    type="text"
                    placeholder="Search company..."
                    value={filters.search}
                    onChange={(e) => handleChange("search", e.target.value)}
                    className="
                        h-10 px-3 text-sm rounded-lg w-64
                        border border-slate-200
                        shadow-sm
                        focus:outline-none
                        focus:ring-2 focus:ring-indigo-500/20
                        focus:border-indigo-500
                    "
                />

                <SelectFilter
                    value={filters.plan}
                    onChange={(value) => handleChange("plan", value)}
                    options={[
                        { label: "All Plans", value: "" },
                        { label: "Basic", value: "Basic" },
                        { label: "Pro", value: "Pro" },
                        { label: "Enterprise", value: "Enterprise" }
                    ]}
                />

                <SelectFilter
                    value={filters.status}
                    onChange={(value) => handleChange("status", value)}
                    options={[
                        { label: "All Status", value: "" },
                        { label: "Active", value: "Active" },
                        { label: "Inactive", value: "Inactive" },
                        { label: "Pending", value: "Pending" }
                    ]}
                />

                <SelectFilter
                    value={filters.dateRange}
                    onChange={(value) => handleChange("dateRange", value)}
                    options={[
                        { label: "Last 7 Days", value: "7" },
                        { label: "Last 30 Days", value: "30" },
                        { label: "Last 6 Months", value: "180" }
                    ]}
                />

            </div>
        </div>
    );
};

const SelectFilter = ({ value, onChange, options }) => {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="
                    h-10 pl-3 pr-10 text-sm rounded-lg
                    border border-slate-200 bg-white text-slate-700
                    shadow-sm transition-all duration-200
                    appearance-none
                    hover:border-slate-300
                    focus:outline-none
                    focus:ring-2 focus:ring-indigo-500/20
                    focus:border-indigo-500
                "
            >
                {options.map((opt) => (
                    <option key={opt.label} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>

            <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        </div>
    );
};

export default FilterBar;