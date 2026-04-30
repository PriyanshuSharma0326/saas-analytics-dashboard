import { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import { PLANS } from "../utils/constants";

const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
    const { user } = useAuth();

    const currentPlan = user?.subscription || "free";

    const plan = PLANS[currentPlan] || PLANS.free;

    return (
        <PlanContext.Provider
            value={{
                currentPlan,
                plan,
                isPremium: currentPlan !== "free",
            }}
        >
            {children}
        </PlanContext.Provider>
    );
};

export const usePlan = () => useContext(PlanContext);
