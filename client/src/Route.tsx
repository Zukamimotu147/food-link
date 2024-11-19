import App from './App';
import { createBrowserRouter } from 'react-router-dom';
import { Home, Contact, AboutUs, FAQ, Error } from './pages/Pages';

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
]);
