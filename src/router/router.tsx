import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from '../App';
import ErrorPage from '../pages/Error/index';
import HomePage from '../pages/Home/index';
import LoginPage from '../pages/Login/index';
import MainPage from '../pages/Main/index';
import ProductPage from '../pages/Product/index';
import ReservationPage from '../pages/Reservation/index';
import UserPage from '../pages/User/index';

// 라우터 정의
const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'main',
        element: <MainPage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'product',
        element: <ProductPage />
      },
      {
        path: 'reservation',
        element: <ReservationPage />
      },
      {
        path: 'user',
        element: <UserPage />
      },
      {
        path: '*',
        element: <ErrorPage />
      }
    ]
  }
];

const router = createBrowserRouter(routes);

export default function Router() {
  return <RouterProvider router={router} />;
}
