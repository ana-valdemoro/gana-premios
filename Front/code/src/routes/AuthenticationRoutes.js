import { Navigate } from 'react-router-dom';

// project imports
import ActiveAccount from '../pages/authentication/ActiveAccount';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
import Login from '../pages/authentication/Login';
import Register from '../pages/authentication/Register';
import NotFound from '../pages/Page404';
import Lopd from '../pages/Lopd';

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <LogoOnlyLayout />,
  children: [
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
    { path: '404', element: <NotFound /> },
    { path: '/', element: <Navigate to="/dashboard" /> },
    { path: '*', element: <Navigate to="/404" /> },
    { path: '/lopd', element: <Lopd /> },
    { path: 'activate-account/:token', element: <ActiveAccount /> }
  ]
};

export default AuthenticationRoutes;
