import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import Calendar from "./components/Calendar";
import TaskList from "./components/TaskList";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
import Profile from "./components/Profile";

export default function App() {
  return (
    <TaskProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-black text-white">
          {/* Navigation Bar */}
          <nav className="bg-gray-900 p-4 border-b border-gray-700">
            <div className="w-full max-w-4xl mx-auto flex justify-center gap-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-lg font-semibold px-4 py-2 rounded-lg transition-colors ${
                    isActive ? "text-blue-400" : "hover:text-gray-400"
                  }`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/calendar"
                className={({ isActive }) =>
                  `text-lg font-semibold px-4 py-2 rounded-lg transition-colors ${
                    isActive ? "text-blue-400" : "hover:text-gray-400"
                  }`
                }
              >
                Calendar
              </NavLink>
              <NavLink
                to="/tasks"
                className={({ isActive }) =>
                  `text-lg font-semibold px-4 py-2 rounded-lg transition-colors ${
                    isActive ? "text-blue-400" : "hover:text-gray-400"
                  }`
                }
              >
                Tasks
              </NavLink>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `text-lg font-semibold px-4 py-2 rounded-lg transition-colors ${
                    isActive ? "text-blue-400" : "hover:text-gray-400"
                  }`
                }
              >
                Settings
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `text-lg font-semibold px-4 py-2 rounded-lg transition-colors ${
                    isActive ? "text-blue-400" : "hover:text-gray-400"
                  }`
                }
              >
                Profile
              </NavLink>
            </div>
          </nav>

          {/* Main Content */}
          <div className="w-full max-w-4xl mx-auto p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
      </Router>
    </TaskProvider>
  );
}
