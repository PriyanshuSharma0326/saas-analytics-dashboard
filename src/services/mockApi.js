import {
    revenueData,
    userGrowthData,
    revenueUsersData,
    transactionsData
} from "./mockData";

const simulateDelay = (data, delay = 800) =>
    new Promise((resolve) =>
        setTimeout(() => resolve(data), delay)
    );

export const fetchRevenueData = () =>
    simulateDelay(revenueData);

export const fetchUserGrowthData = () =>
    simulateDelay(userGrowthData);

export const fetchRevenueUsersData = () =>
    simulateDelay(revenueUsersData);

export const fetchPlanDistributionData = () => {
    const distribution = transactionsData.reduce((acc, item) => {
        acc[item.plan] = (acc[item.plan] || 0) + 1;
        return acc;
    }, {});

    return simulateDelay(
        Object.entries(distribution).map(([name, value]) => ({
            name,
            value
        }))
    );
};