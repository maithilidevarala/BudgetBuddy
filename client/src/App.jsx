import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Budget from "./pages/Budget";
import Savings from "./pages/Savings";
import Reports from "./pages/Reports";

import MainLayout from "./layouts/MainLayout";
import { isLoggedIn } from "./utils/auth";

function PrivateRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </PrivateRoute>
          }
        />

        {/* Income */}
        <Route
          path="/income"
          element={
            <PrivateRoute>
              <MainLayout>
                <Income />
              </MainLayout>
            </PrivateRoute>
          }
        />

        {/* Expense */}
        <Route
          path="/expense"
          element={
            <PrivateRoute>
              <MainLayout>
                <Expense />
              </MainLayout>
            </PrivateRoute>
          }
        />

        {/* Budget */}
        <Route
          path="/budget"
          element={
            <PrivateRoute>
              <MainLayout>
                <Budget />
              </MainLayout>
            </PrivateRoute>
          }
        />

        {/* Savings */}
        <Route
          path="/savings"
          element={
            <PrivateRoute>
              <MainLayout>
                <Savings />
              </MainLayout>
            </PrivateRoute>
          }
        />

        {/* Reports */}
        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <MainLayout>
                <Reports />
              </MainLayout>
            </PrivateRoute>
          }
        />

        {/* Invalid URL */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;