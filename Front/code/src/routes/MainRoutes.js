import { Navigate } from 'react-router-dom';

// layout
import DashboardLayout from '../layouts/dashboard';

import DashboardApp from '../pages/DashboardApp';
import Products from '../pages/Products';
import Blog from '../pages/Blog';
import User from '../pages/User';
import Profile from '../pages/Profile';
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/dashboard',
  element: <DashboardLayout />,
  children: [
    { element: <Navigate to="/dashboard/app" replace /> },
    { path: 'app', element: <DashboardApp /> },
    { path: 'user', element: <User /> },
    { path: 'products', element: <Products /> },
    { path: 'blog', element: <Blog /> },
    { path: 'account', element: <Profile /> }
  ]
};

export default MainRoutes;
