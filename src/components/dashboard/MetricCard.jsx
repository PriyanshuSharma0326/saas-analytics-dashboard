import useCountUp from "../../hooks/useCountUp";

const MetricCard = ({ title, value, badge, isCurrency }) => {
    const numericValue = Number(value);

    const animatedValue = useCountUp(numericValue);

    const displayValue = isCurrency
        ? `₹${animatedValue.toLocaleString()}`
        : animatedValue.toLocaleString();

    return (
        <div className="
            bg-white rounded-xl p-4
            shadow-sm border border-slate-200

            transition-all duration-300 ease-out
            hover:shadow-md hover:-translate-y-0.5
        ">
            <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-medium text-slate-500">
                    {title}
                </p>

                {badge}
            </div>

            <h3 className="text-xl font-semibold text-slate-900">
                {displayValue}
            </h3>
        </div>
    );
};

export default MetricCard;
