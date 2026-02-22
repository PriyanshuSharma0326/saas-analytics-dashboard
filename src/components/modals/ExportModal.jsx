const ExportModal = ({ isOpen, onClose, onExport }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-80 p-5">
                <h3 className="text-sm font-semibold text-slate-900 mb-4">
                    Export Report
                </h3>

                <div className="space-y-2 mb-4">
                    <button
                        onClick={() => onExport("csv")}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 hover:bg-slate-50"
                    >
                        CSV
                    </button>

                    <button
                        onClick={() => onExport("json")}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 hover:bg-slate-50"
                    >
                        JSON
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="text-xs text-slate-500 hover:text-slate-700"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ExportModal;
