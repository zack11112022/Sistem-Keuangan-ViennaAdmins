import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const MainLayout = lazy(() => import('./layout/MainLayout'));
const AuthLayout = lazy(() => import('./layout/AuthLayout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Products = lazy(() => import('./pages/auth/Products'));
const Login = lazy(() => import('./pages/auth/Login'));
const Kasir = lazy(() => import('./pages/Kasir'));
const ManajemenAkun = lazy(() => import('./pages/ManajemenAkun'));
const Pengeluaran = lazy(() => import('./pages/Pengeluaran'));

const Loading = () => <div className="p-5">Loading...</div>;

// Menjaga akses berdasarkan status login & role.
// - allowedRoles tidak diisi -> semua akun yang sudah login boleh masuk.
// - allowedRoles diisi -> hanya role yang ada di daftar yang boleh masuk,
//   selain itu diarahkan ke halaman utama role tersebut.
function RoleRoute({ allowedRoles, children }) {
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
  const role = localStorage.getItem('role');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    const fallback = role === 'Karyawan' ? '/kasir' : '/';
    return <Navigate to={fallback} replace />;
  }

  return children;
}

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <RoleRoute allowedRoles={['Pemilik']}>
                <Dashboard />
              </RoleRoute>
            }
          />
          <Route
            path="/products"
            element={
              <RoleRoute allowedRoles={['Pemilik']}>
                <Products />
              </RoleRoute>
            }
          />
          <Route
            path="/manajemen-akun"
            element={
              <RoleRoute allowedRoles={['Pemilik']}>
                <ManajemenAkun />
              </RoleRoute>
            }
          />
          <Route
            path="/pengeluaran"
            element={
              <RoleRoute allowedRoles={['Pemilik']}>
                <Pengeluaran />
              </RoleRoute>
            }
          />
          <Route
            path="/kasir"
            element={
              <RoleRoute>
                <Kasir />
              </RoleRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;