import { createSlice } from "@reduxjs/toolkit";
import {
    fetchPlanDistributionData,
    fetchRevenueData,
    fetchRevenueUsersData,
    fetchUserGrowthData
} from "../../services/mockApi";

const initialState = {
    metrics: {
        revenue: [],
        growth: []
    },
    analytics: {
        revenue: [],
        revenueUsersData: [],
        planDistributionData: []
    },
    loading: false,
    error: null
};

export const loadDashboardData = () => async (dispatch) => {
    try {
        dispatch(fetchStart());

        const [revenue, growth] = await Promise.all([
            fetchRevenueData(),
            fetchUserGrowthData()
        ]);

        dispatch(dashboardSuccess({ revenue, growth }));
    } catch {
        dispatch(fetchError("Failed to load dashboard data"));
    }
};

export const loadAnalyticsData = () => async (dispatch) => {
    try {
        dispatch(fetchStart());

        const [revenue, revenueUsersData, planDistributionData] =
            await Promise.all([
                fetchRevenueData(),
                fetchRevenueUsersData(),
                fetchPlanDistributionData()
            ]);

        dispatch(
            analyticsSuccess({
                revenue,
                revenueUsersData,
                planDistributionData
            })
        );
    } catch {
        dispatch(fetchError("Failed to load analytics data"));
    }
};

const analyticsSlice = createSlice({
    name: "analytics",
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        dashboardSuccess: (state, action) => {
            state.loading = false;
            state.metrics = action.payload;
        },

        analyticsSuccess: (state, action) => {
            state.loading = false;
            state.analytics = action.payload;
        },

        fetchError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {
    fetchStart,
    dashboardSuccess,
    analyticsSuccess,
    fetchError
} = analyticsSlice.actions;

export default analyticsSlice.reducer;