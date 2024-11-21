import App from './App';
import { createBrowserRouter } from 'react-router-dom';
import {
  Home,
  Contact,
  AboutUs,
  FAQ,
  Error,
  Login,
  Register,
  ResDashboard,
  AdminDashboard,
} from './pages/Pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: '/contact-us',
        element: <Contact />,
        errorElement: <Error />,
      },
      {
        path: '/about-us',
        element: <AboutUs />,
        errorElement: <Error />,
      },
      {
        path: '/faq',
        element: <FAQ />,
        errorElement: <Error />,
      },
    ],
  },
  {
    path: '/auth/register',
    element: <Register />,
    errorElement: <Error />,
  },
  {
    path: '/auth/login',
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: '/dashboard/restaurant',
    element: <ResDashboard />,
    errorElement: <Error />,
  },
  {
    path: '/dashboard/admin',
    element: <AdminDashboard />,
    errorElement: <Error />,
  },
]);
