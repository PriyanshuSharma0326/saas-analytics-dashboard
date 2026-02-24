import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import ProtectedRoute from "./ProtectedRoute";

import Dashboard from "../pages/Dashboard";
import Reports from "../pages/Reports";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import Plans from "../pages/Plans";
import Checkout from "../pages/Checkout";
import Error from "../pages/Error";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="/" element={
                    <ProtectedRoute>
                        <Layout>
                            <Dashboard />
                        </Layout>
                    </ProtectedRoute>
                } />

                <Route path="/reports" element={
                    <ProtectedRoute>
                        <Layout>
                            <Reports />
                        </Layout>
                    </ProtectedRoute>
                } />

                <Route path="/analytics" element={
                    <ProtectedRoute>
                        <Layout>
                            <Analytics />
                        </Layout>
                    </ProtectedRoute>
                } />

                <Route path="/settings" element={
                    <ProtectedRoute>
                        <Layout>
                            <Settings />
                        </Layout>
                    </ProtectedRoute>
                } />

                <Route path="/plans" element={
                    <ProtectedRoute>
                        <Plans />
                    </ProtectedRoute>
                } />

                <Route path="/checkout" element={
                    <ProtectedRoute>
                        <Checkout />
                    </ProtectedRoute>
                } />

                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
