import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const MainLayout = lazy(() => import('./layout/MainLayout'));
const AuthLayout = lazy(() => import('./layout/AuthLayout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Products = lazy(() => import('./pages/auth/Products'));
const Login = lazy(() => import('./pages/auth/Login'));

const Loading = () => <div className="p-5">Loading...</div>;


function App() {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;