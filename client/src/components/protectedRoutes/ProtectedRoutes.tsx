import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const localToken = localStorage.getItem('localToken');
  const token = queryParams.get('token');

  // Use either the local token or the token from the Google login
  const authToken = localToken || token;

  // Check if the token exists and is valid
  if (!authToken) {
    return <Navigate to="/auth/login" replace />;
  }

  // Optionally, you can decode the token to check its validity
  try {
    const decodedToken: { exp: number } = jwtDecode(authToken);
    const currentTime = Date.now() / 1000;

    // Check if the token is expired
    if (decodedToken?.exp < currentTime) {
      return <Navigate to="/auth/login" replace />;
    }
  } catch (error) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
