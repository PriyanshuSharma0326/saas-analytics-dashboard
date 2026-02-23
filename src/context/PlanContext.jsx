import { createContext, useContext, useState } from "react";

const PlanContext = createContext();

export const PLANS = {
    basic: {
        name: "Basic",
        analyticsLocked: true,
        exportLocked: true,
        dateFilterLocked: false,
    },
    premium: {
        name: "Premium",
        analyticsLocked: false,
        exportLocked: false,
        dateFilterLocked: false,
        planDistLocked: true,
    },
    super_premium: {
        name: "Super Premium",
        analyticsLocked: false,
        exportLocked: false,
        dateFilterLocked: false,
        halfData: false,
        planDistLocked: false,
    },
};

export const PlanProvider = ({ children }) => {
    const [currentPlan, setCurrentPlan] = useState("basic");

    return (
        <PlanContext.Provider value={{ currentPlan, setCurrentPlan, plan: PLANS[currentPlan] }}>
            {children}
        </PlanContext.Provider>
    );
};

export const usePlan = () => useContext(PlanContext);
