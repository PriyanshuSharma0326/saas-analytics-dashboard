import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { PlanProvider } from "./context/PlanContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <ThemeProvider>
            <AuthProvider>
                <PlanProvider>
                    <App />
                </PlanProvider>
            </AuthProvider>
        </ThemeProvider>
    </Provider>
);
