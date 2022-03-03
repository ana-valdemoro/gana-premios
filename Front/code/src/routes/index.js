import { Navigate, useRoutes } from 'react-router-dom';

import { useSelector } from 'react-redux';
import AuthenticationRoutes from './AuthenticationRoutes';
import { MainRoutes } from './MainRoutes';

// ----------------------------------------------------------------------

export default function Router() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  return useRoutes([
    MainRoutes(isLoggedIn, user),
    AuthenticationRoutes,
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
