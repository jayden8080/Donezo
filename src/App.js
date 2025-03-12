import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import Calendar from "./components/Calendar";
import TaskList from "./components/TaskList";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
import Profile from "./components/Profile";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "black",
    color: "white",
    position: "relative",
    overflowX: "hidden",
  };

  const headerStyle = {
    backgroundColor: "black",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    borderBottom: "1px solid gray",
    position: "relative",
  };

  const menuButtonStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const titleStyle = {
    fontSize: "32px",
    fontWeight: "bold",
    textAlign: "center",
    flexGrow: 1,
  };

  const settingsLinkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
  };

  const sideMenuStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    height: "100%",
    width: "250px",
    backgroundColor: "#333",
    color: "white",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.5)",
    transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
    transition: "transform 0.3s ease-in-out",
    padding: "20px",
  };

  const linkStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "15px 0",
    textDecoration: "none",
    color: "white",
    display: "block",
  };

  const mainContentStyle = {
    marginLeft: menuOpen ? "250px" : "0",
    transition: "margin-left 0.3s ease-in-out",
    padding: "20px",
  };

  return (
    <TaskProvider>
      <Router>
        <div style={containerStyle}>
          {/* Top Bar */}
          <header style={headerStyle}>
            <button onClick={toggleMenu} style={menuButtonStyle}>
              ☰
            </button>
            <div style={titleStyle}>Donezo</div>
            <a href="/settings" style={settingsLinkStyle}>
              Settings
            </a>
          </header>

          {/* Side Menu */}
          <aside style={sideMenuStyle}>
            <a href="/" style={linkStyle}>
              Dashboard
            </a>
            <a href="/calendar" style={linkStyle}>
              Calendar
            </a>
            <a href="/tasks" style={linkStyle}>
              Tasks
            </a>
            <a href="/settings" style={linkStyle}>
              Settings
            </a>
            <a href="/profile" style={linkStyle}>
              Profile
            </a>
          </aside>

          {/* Main Content */}
          <main style={mainContentStyle}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </Router>
    </TaskProvider>
  );
}