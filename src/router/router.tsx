import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from '../App';
import Authorization from '../components/Authorization';
import Admin from '../pages/Admin/index';
import ErrorPage from '../pages/Error/index';
import HomePage from '../pages/Home/index';
import LoginPage from '../pages/Login/index';
import MainPage from '../pages/Main/index';
import ProductPage from '../pages/Product/index';
import ReservationPage from '../pages/Reservation/index';
import UserPage from '../pages/User/index';

type Role = 'SUPER_ADMIN' | 'ADMIN' | 'USER';

type AppRouteObject = RouteObject & {
  requiredRole?: Role;
};

const wrapWithAuthorization = (routes: AppRouteObject[]): RouteObject[] => {
  return routes.map(({ requiredRole, element, children, index, ...rest }) => {
    const wrappedElement = requiredRole ? (
      <Authorization redirectTo="/login" requiredRole={requiredRole}>
        {element}
      </Authorization>
    ) : (
      element
    );

    if (index) {
      return {
        index: true,
        element: wrappedElement
      };
    }

    return {
      ...rest,
      path: rest.path,
      element: wrappedElement,
      children: children ? wrapWithAuthorization(children) : undefined
    };
  });
};

const routes: AppRouteObject[] = [
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
        path: 'admin',
        element: <Admin />,
        requiredRole: 'ADMIN'
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
        element: <ReservationPage />,
        requiredRole: 'USER'
      },
      {
        path: 'user',
        element: <UserPage />,
        requiredRole: 'USER'
      },
      {
        path: '*',
        element: <ErrorPage />
      }
    ] as AppRouteObject[]
  }
];

const router = createBrowserRouter(wrapWithAuthorization(routes));

export default function Router() {
  return <RouterProvider router={router} />;
}
