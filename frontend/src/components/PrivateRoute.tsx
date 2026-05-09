import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const PrivateRoute = () => {
  const { token } = useAuth();
  
  // Se não tem token, manda pro login
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  // Se tem token, renderiza a rota filha
  return <Outlet />;
};
