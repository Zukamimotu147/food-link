import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  //   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const localToken = localStorage.getItem('token');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  console.log('token from protected route', token);
  //   useEffect(() => {
  //     const checkAuthentication = async () => {
  //       try {
  //         const response = await axios.get('http://localhost:3000/auth/currentUser', {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });
  //         if (response.status === 200) {
  //           setIsAuthenticated(true);
  //         } else {
  //           setIsAuthenticated(false);
  //         }
  //       } catch (error) {
  //         console.error('Error checking authentication:', error);
  //         setIsAuthenticated(false);
  //       }
  //     };

  //     checkAuthentication();
  //   }, []);

  // Check if the token exists and is valid
  if (!token || !localToken) {
    return <Navigate to="/auth/login" replace />;
  }

  // Optionally, you can decode the token to check its validity
  try {
    const decodedToken: { exp: number } = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    // Check if the token is expired
    if (decodedToken?.exp < currentTime) {
      return <Navigate to="/auth/login" replace />;
    }
  } catch (error) {
    return <Navigate to="/auth/login" replace />;
  }

  return children || <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
