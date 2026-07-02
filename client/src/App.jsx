import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Budget from "./pages/Budget";
import Savings from "./pages/Savings";

import MainLayout from "./layouts/MainLayout";
import { isLoggedIn } from "./utils/auth";

const PrivateRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected with Layout */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </PrivateRoute>
          }
        />

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

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;