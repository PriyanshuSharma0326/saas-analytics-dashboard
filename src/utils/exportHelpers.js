export const exportToCsv = (data, filename = "report.csv") => {
    if (!data.length) return;

    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(obj =>
        Object.values(obj).join(",")
    );

    const csvContent = [headers, ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
};

export const exportToJson = (data, filename = "report.json") => {
    const blob = new Blob(
        [JSON.stringify(data, null, 2)],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
};
