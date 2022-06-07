import { Navigate } from 'react-router-dom';

// layout
import DashboardLayout from '../layouts/dashboard';
// pages
import DashboardApp from '../pages/DashboardApp';
import Products from '../pages/Products';
import Blog from '../pages/Blog';
import User from '../pages/User';
import Profile from '../pages/Profile';
import Clients from '../pages/clients/Clients';
import CreateClient from '../pages/clients/CreateClient';

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
    {
      path: 'app',
      element:
        user?.lopd_uuid !== '' ? <DashboardApp /> : <Navigate to="/dashboard/profile" replace />
    },
    {
      path: 'user',
      element: user?.lopd_uuid !== '' ? <User /> : <Navigate to="/dashboard/profile" replace />
    },
    {
      path: 'products',
      element: user?.lopd_uuid !== '' ? <Products /> : <Navigate to="/dashboard/profile" replace />
    },
    {
      path: 'blog',
      element: user?.lopd_uuid !== '' ? <Blog /> : <Navigate to="/dashboard/profile" replace />
    },
    { path: 'profile', element: <Profile /> },
    {
      path: 'clients',
      children: [
        {
          element: <Clients />
        },
        {
          path: 'create-client',
          element: <CreateClient />
        }
      ]
    }
  ]
});
