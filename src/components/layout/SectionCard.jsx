const SectionCard = ({ title, description }) => (
    <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            {title}
        </h2>

        <p className="text-sm text-slate-500">
            {description}
        </p>
    </div>
);

export default SectionCard;
