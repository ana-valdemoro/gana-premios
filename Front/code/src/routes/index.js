import { Navigate, useRoutes } from 'react-router-dom';

import AuthenticationRoutes from './AuthenticationRoutes';
import MainRoutes from './MainRoutes';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    MainRoutes,
    AuthenticationRoutes,
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
