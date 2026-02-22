import { revenueData, userGrowthData } from "./mockData";

const simulateDelay = (data, delay = 800) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(data), delay);
    });
};

export const fetchRevenueData = () => simulateDelay(revenueData);
export const fetchUserGrowthData = () => simulateDelay(userGrowthData);
