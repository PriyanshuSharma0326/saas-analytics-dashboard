const ExportModal = ({ isOpen, onClose, onExport }) => {
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
                        Export Report
                    </h3>

                    <p className="text-xs text-slate-500 mt-1">
                        Choose a format to download your data
                    </p>
                </div>

                <div className="space-y-2 mb-5">
                    <button
                        onClick={() => onExport("csv")}
                        className="w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition"
                    >
                        <span className="text-slate-700 font-medium">CSV</span>

                        <span className="text-xs text-slate-400">Spreadsheet</span>
                    </button>

                    <button
                        onClick={() => onExport("json")}
                        className="w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition"
                    >
                        <span className="text-slate-700 font-medium">JSON</span>

                        <span className="text-xs text-slate-400">Raw Data</span>
                    </button>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="text-xs font-medium text-slate-500 hover:text-slate-700 transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExportModal;
