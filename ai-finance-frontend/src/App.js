import ExpenseTracker from "./pages/ExpenseTracker";
import FinancialPlanningForm from "./pages/FinancialPlanningForm";
import RadarLoader from "./components/RadarLoader";

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import DetailedAnalytics from "./pages/DetailedAnalytics";

import ScoreAnalytics from "./pages/ScoreAnalytics";
import SuggestionAnalytics from "./pages/SuggestionAnalytics";
import WarningAnalytics from "./pages/WarningAnalytics";
import GoalAnalytics from "./pages/GoalAnalytics";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* LOGIN */}
                <Route
                    path="/"
                    element={<Login />}
                />

                {/* REGISTER */}
                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* EXPENSE TRACKER */}
                <Route
                    path="/expense-tracker"
                    element={<ExpenseTracker />}
                />

                {/* FINANCIAL PLANNING */}
                <Route
                    path="/financial-planning"
                    element={<FinancialPlanningForm />}
                />

                {/* RADAR LOADER */}
                <Route
                    path="/radar"
                    element={<RadarLoader />}
                />

                {/* DASHBOARD */}
                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                {/* ANALYTICS PAGES */}

                <Route
                    path="/analytics/score"
                    element={<ScoreAnalytics />}
                />

                <Route
                    path="/analytics/suggestion"
                    element={<SuggestionAnalytics />}
                />

                <Route
                    path="/analytics/warning"
                    element={<WarningAnalytics />}
                />

                <Route
                    path="/analytics/goal"
                    element={<GoalAnalytics />}
                />

                <Route
                    path="/analytics/insight"
                    element={<DetailedAnalytics />}
                />

            </Routes>

        </BrowserRouter>

    );
}

export default App;