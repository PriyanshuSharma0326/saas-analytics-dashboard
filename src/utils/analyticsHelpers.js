export const splitPeriods = (data, days) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const current = [];
    const previous = [];

    data.forEach((item) => {
        const date = new Date(item.date);
        date.setHours(0, 0, 0, 0);

        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

        if (diffDays >= 0 && diffDays < days) {
            current.push(item);
        } else if (diffDays >= days && diffDays < days * 2) {
            previous.push(item);
        }
    });

    return { current, previous };
};

export const calculateChange = (currentValue, previousValue) => {
    if (!previousValue) return 0;

    return Number(
        (((currentValue - previousValue) / previousValue) * 100).toFixed(1)
    );
};
