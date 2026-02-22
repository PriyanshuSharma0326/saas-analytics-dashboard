import { createSlice } from "@reduxjs/toolkit";
import { fetchRevenueData, fetchUserGrowthData } from "../../services/mockApi";

const initialState = {
    metrics: {
        revenue: [],
        growth: []
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

        dispatch(
            fetchSuccess({
                revenue,
                growth
            })
        );
    } catch (error) {
        dispatch(fetchError("Failed to load dashboard data"));
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
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.metrics = action.payload;
        },
        fetchError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { fetchStart, fetchSuccess, fetchError } =
    analyticsSlice.actions;

export default analyticsSlice.reducer;
