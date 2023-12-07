// Root.js
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Dashboard from './layouts/Dashboard';
import Login from './layouts/Login';
import Product from './layouts/Product';
import AdminProduct from './layouts/AdminProduct';
import AdminOrder from './layouts/AdminOrder';
import ProductDetails from './layouts/ProductDetails';
import * as routes from './constants/routes';
import OrderDetails from './layouts/OrderDetails';
import Home from './layouts/Home';
import AdminHome from './layouts/AdminHome';
import Order from './layouts/Order';

const PrivateRoute = ({ element: Element, requiresAuth, isAdmin }) => {
  const { isAuthenticated, userEmail } = useAuth();

  console.log('PrivateRoute - requiresAuth:', requiresAuth);
  console.log('PrivateRoute - isAuthenticated:', isAuthenticated);
  console.log('PrivateRoute - isAdmin:', isAdmin);
  console.log('PrivateRoute - userEmail:', userEmail);

  if (requiresAuth && !isAuthenticated) {
    console.log('Redirecting to login...');
    return <Navigate to={routes.MINI_PROJECT_LOGIN} />;
  }

  // if (!isAdmin && userEmail !== 'nomashikarunadasa@gmail.com') {
  //   console.log('Redirecting to home...');
  //   return <Navigate to={routes.MINI_PROJECT_HOME} />;
  // }

  console.log('Rendering element...');
  return <Element />;
};
console.log('Element type:', typeof Element);

export default function Root(props) {
  return (
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes (accessible to all) */}
            <Route path={routes.MINI_PROJECT} element={<Dashboard />} />
            <Route path={routes.MINI_PROJECT_LOGIN} element={<Login />} />

            {/* Private routes (require authentication) */}
            <Route
              path={`${routes.MINI_PROJECT_PRODUCT}/:id`}
              element={<PrivateRoute element={ProductDetails} requiresAuth />}
            />
             <Route
              path={routes.MINI_PROJECT_ORDER}
              element={<PrivateRoute element={Order} requiresAuth />}
            />
            <Route
              path={routes.MINI_PROJECT_HOME}
              element={<PrivateRoute element={Home} requiresAuth />}
            />
            <Route
              path={`${routes.MINI_PROJECT_ADMIN_ORDER}/:id`}
              element={<PrivateRoute element={OrderDetails} requiresAuth isAdmin />}
            />
            <Route
              path={routes.MINI_PROJECT_ADMIN_HOME}
              element={<PrivateRoute element={AdminHome} requiresAuth isAdmin />}
            />
            <Route
              path={routes.MINI_PROJECT_PRODUCT}
              element={<PrivateRoute element={Product} requiresAuth />}
            />
            <Route
              path={routes.MINI_PROJECT_ADMIN_PRODUCT}
              element={<PrivateRoute element={AdminProduct} requiresAuth isAdmin />}
            />
            <Route
              path={routes.MINI_PROJECT_ADMIN_ORDER}
              element={<PrivateRoute element={AdminOrder} requiresAuth isAdmin />}
            />

            {/* Add a catch-all route for unknown paths */}
            <Route path="*" element={<Navigate to={routes.MINI_PROJECT} />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  );
}
