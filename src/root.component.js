// Root.js
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // Import your AuthContext
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

// // PrivateRoute function to protect routes
// const PrivateRoute = ({ component: Component, requiresAuth, ...rest }) => {
//   const { isAuthenticated } = useAuth();

//   return (
//     <Route
//     {...rest}
//     render={(props) => {
//       if (requiresAuth && !isAuthenticated) {
//         // Redirect to login if the route requires authentication and the user is not authenticated
//         return <Redirect to={routes.MINI_PROJECT_LOGIN} />;
//       } else if (!requiresAuth && isAuthenticated) {
//         // Redirect to dashboard if the route does not require authentication and the user is authenticated
//         return <Redirect to={routes.MINI_PROJECT} />;
//       } else {
//         // Render the component for other cases
//         return <Component {...props} />;
//       }
//     }}
//   />
//   );
// };
// PrivateRoute function to protect routes
// PrivateRoute function to protect routes
// PrivateRoute function to protect routes
const PrivateRoute = ({ component: Component, requiresAuth, isAdmin, ...rest }) => {
  const { isAuthenticated, userEmail } = useAuth();

  if (requiresAuth && !isAuthenticated) {
    // Redirect to login if the route requires authentication and the user is not authenticated
    return <Redirect to={routes.MINI_PROJECT_LOGIN} />;
  }

  if (isAdmin) {
    // Check if the user is an admin
    if (userEmail === 'nomashikarunadasa@gmail.com') {
      // Render the admin component if the user is the admin
      return <Component {...rest} />;
     }//else {
    //   // Redirect to regular home if the user is not the admin
    //   return <Redirect to={routes.MINI_PROJECT_HOME} />;
    // }
  }

  // Render the component for other cases
  return <Component {...rest} />;
};




export default function Root(props) {
  return (
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            {/* Public routes (accessible to all) */}
            <Route exact path={routes.MINI_PROJECT} component={Dashboard} />
            <Route path={routes.MINI_PROJECT_LOGIN} component={Login} />

            {/* Private routes (require authentication) */}
            <PrivateRoute exact path={routes.MINI_PROJECT_HOME} component={Home} requiresAuth />
            <PrivateRoute path={`${routes.MINI_PROJECT_ADMIN_ORDER}/:id`} component={OrderDetails} requiresAuth isAdmin />
            <PrivateRoute exact path={routes.MINI_PROJECT_ORDER} component={Order} requiresAuth />
            <PrivateRoute exact path={routes.MINI_PROJECT_ADMIN_HOME} component={AdminHome} requiresAuth isAdmin />
            <PrivateRoute exact path={routes.MINI_PROJECT_PRODUCT} component={Product} requiresAuth />
            <PrivateRoute path={routes.MINI_PROJECT_ADMIN_PRODUCT} component={AdminProduct} requiresAuth isAdmin />
            <PrivateRoute path={`${routes.MINI_PROJECT_PRODUCT}/:id`} component={ProductDetails} requiresAuth />
            <PrivateRoute path={routes.MINI_PROJECT_ADMIN_ORDER} component={AdminOrder} requiresAuth isAdmin />

          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  );
}
