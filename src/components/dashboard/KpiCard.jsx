const KpiCard = ({ title, value, change }) => {
    return (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 transition-all duration-300 ease-out hover:shadow-md hover:-translate-y-0.5">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-slate-500">{title}</p>

                    <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mt-1">
                        {value}
                    </h3>
                </div>

                <span className="text-xs font-medium px-2 py-1 rounded-lg bg-green-50 text-green-600 shrink-0">
                    {change}
                </span>
            </div>
        </div>
    );
};

export default KpiCard;
