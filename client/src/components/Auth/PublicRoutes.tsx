import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../helpers/auth';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  if (isAuthenticated()) {
    // Redirect to the protected page they came from, or dashboard
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute