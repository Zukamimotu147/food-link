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
  ActiveDonation,
  AddDonation,
  ResDonationHistory,
  ResOverview,
  AddCharity,
  AdmDonationHistory,
  ApprovalDonation,
  CharityTable,
} from './pages/Pages';
import ProtectedRoute from './components/protectedRoutes/ProtectedRoutes';

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
    element: (
      <ProtectedRoute>
        <ResDashboard />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        path: '/dashboard/restaurant/active-donation',
        element: <ActiveDonation />,
        errorElement: <Error />,
      },
      {
        path: '/dashboard/restaurant/add-donation',
        element: <AddDonation />,
        errorElement: <Error />,
      },
      {
        path: '/dashboard/restaurant/donation-history',
        element: <ResDonationHistory />,
        errorElement: <Error />,
      },
      {
        path: '/dashboard/restaurant/res-overview',
        element: <ResOverview />,
        errorElement: <Error />,
      },
    ],
  },
  {
    path: '/dashboard/admin/',
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        path: '/dashboard/admin/add-charity',
        element: <AddCharity />,
        errorElement: <Error />,
      },
      {
        path: '/dashboard/admin/donation-history',
        element: <AdmDonationHistory />,
        errorElement: <Error />,
      },
      {
        path: '/dashboard/admin/approval-donation',
        element: <ApprovalDonation />,
        errorElement: <Error />,
      },
      {
        path: '/dashboard/admin/charities',
        element: <CharityTable />,
        errorElement: <Error />,
      },
    ],
  },
]);
