const DowngradeModal = ({ isOpen, onClose, onConfirm, plan }) => {
    if (!isOpen) return null;

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-xl w-80 p-5 border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
            >
                <div className="mb-4">
                    <h3 className="text-sm font-semibold text-slate-900">
                        Confirm Downgrade
                    </h3>

                    <p className="text-xs text-slate-500 mt-1">
                        Downgrading to <span className="font-medium text-slate-700">{plan}</span> will remove some features.
                    </p>
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="text-xs font-medium text-slate-500 hover:text-slate-700 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DowngradeModal;
