import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import DashboardLayout from "./components/Layout/DashboardLayout";
import Scan from "./pages/Scan";
import History from "./pages/History";
import Profile from "./pages/Profile";
import AuthGuard from "./utils/authGuard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Redirect old dashboard route */}
        <Route path="/dashboard" element={<Navigate to="/app/scan" replace />} />

        {/* Protected routes */}
        <Route
          path="/app"
          element={
            <AuthGuard>
              <DashboardLayout />
            </AuthGuard>
          }
        >
          <Route path="scan" element={<Scan />} />
          <Route path="history" element={<History />} />
          <Route path="profile" element={<Profile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
