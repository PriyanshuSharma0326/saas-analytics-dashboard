export const filterTransactions = (data, filters) => {
    const now = new Date();
    const dateRangeDays = Number(filters.dateRange);

    return data.filter((item) => {
        if (filters.plan && item.plan !== filters.plan) return false;
        if (filters.status && item.status !== filters.status) return false;

        if (
            filters.search &&
            !item.name.toLowerCase().includes(filters.search.toLowerCase())
        )
            return false;

        const diffDays =
            (now - new Date(item.date)) / (1000 * 60 * 60 * 24);

        if (diffDays > dateRangeDays) return false;

        return true;
    });
};
