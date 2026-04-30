export const fillMissingDates = (data, key, days) => {
    const map = {};

    data.forEach(item => {
        map[item.date] = item[key];
    });

    const result = [];

    const formatDate = (date) =>
        date.toLocaleDateString("en-CA", {
            timeZone: "Asia/Kolkata"
        });

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);

        const dateStr = formatDate(date);

        result.push({
            date: dateStr,
            [key]: map[dateStr] || 0
        });
    }

    return result;
};
