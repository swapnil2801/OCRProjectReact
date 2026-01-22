import { Outlet } from "react-router-dom";
import "../../styles/dashboard.css";

export default function DashboardLayout() {
  return (
    <div className="dash-container">
      <aside className="dash-sidebar">
        <h2 className="dash-logo">
          OCR<span>AI</span>
        </h2>

        <nav className="dash-menu">
          <a href="/app/scan" className="dash-link">📄 Scan</a>
          <a href="/app/history" className="dash-link">🕓 History</a>
          <a href="/app/profile" className="dash-link">⚙ Profile</a>
        </nav>

        <div className="dash-bottom">
          <a href="/" className="edit-btn">🚪 Logout</a>
        </div>
      </aside>

      <main className="dash-main">
        <Outlet />   {/* ← IMPORTANT: Protected children render here */}
      </main>
    </div>
  );
}
