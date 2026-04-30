import SelectFilter from "../ui/SelectFilter";

const FilterBar = ({ filters, setFilters, rightContent }) => {
    const handleChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                    <input
                        type="text"
                        placeholder="Search company..."
                        value={filters.search}
                        onChange={(e) => handleChange("search", e.target.value)}
                        className="w-full sm:w-64 h-10 px-3 text-sm rounded-lg border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
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

                {rightContent && (
                    <div className="flex justify-end">
                        {rightContent}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilterBar;
