import { Navigate } from 'react-router-dom';

// layout
import DashboardLayout from '../layouts/dashboard';
// pages
import DashboardApp from '../pages/DashboardApp';
import Products from '../pages/Products';
import Blog from '../pages/Blog';
import User from '../pages/User';
import Profile from '../pages/Profile';
// ==============================|| MAIN ROUTING ||============================== //

export const MainRoutes = (isLoggedIn, user) => ({
  path: '/dashboard',
  element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" replace />,
  children: [
    {
      element:
        user?.lopd_uuid !== '' ? (
          <Navigate to="/dashboard/app" replace />
        ) : (
          <Navigate to="/dashboard/profile" />
        )
    },
    { path: 'app', element: <DashboardApp /> },
    { path: 'user', element: <User /> },
    { path: 'products', element: <Products /> },
    { path: 'blog', element: <Blog /> },
    { path: 'profile', element: <Profile /> }
  ]
});
