import { analyticsInsights } from "../../services/mockData";

const InsightsPanel = () => {
    return (
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-slate-200 mb-6">
            <h3 className="text-sm font-medium text-slate-700 mb-4">
                Insights & Observations
            </h3>

            <div className="space-y-3">
                {analyticsInsights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />

                        <p className="text-sm text-slate-600 leading-relaxed">
                            {insight}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InsightsPanel;
