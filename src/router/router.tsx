import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from '../App';
import Authorization from '../components/Authorization';
import Admin from '../pages/Admin/index';
import CartPage from '../pages/Cart/index';
import ErrorPage from '../pages/Error/index';
import LoginPage from '../pages/Login/index';
import MainPage from '../pages/Main/index';
import PaymentCompletePage from '../pages/PaymentComplete/index';
import PaymentProcessPage from '../pages/PaymentProcess/index';
import ProductPage from '../pages/Product/index';
import ProductDetailPage from '../pages/ProductDetail/index';
import ReservationPage from '../pages/Reservation/index';
import UserPage from '../pages/User/index';
import UserEditPage from '../pages/UserEdit/index';

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
        index: true, // 루트 경로('/')에서 보여질 페이지
        element: <MainPage /> // 기존 HomePage 대신 MainPage를 홈으로 사용
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
        path: 'product/:id', // 동적 라우팅. 엔드포인트 관련 추가 논의 필요
        element: <ProductDetailPage />
      },
      {
        path: 'reservation',
        element: <ReservationPage />
        // 페이지 레이아웃 구성을 위해 임시로 비활성화
        // requiredRole: 'USER'
      },
      {
        path: 'cart',
        element: <CartPage />
      },
      {
        path: 'payment-process',
        element: <PaymentProcessPage />
      },
      {
        path: 'payment-complete',
        element: <PaymentCompletePage />
      },
      {
        path: 'user',
        element: <UserPage />,
        requiredRole: 'USER'
      },
      {
        path: 'user-edit',
        element: <UserEditPage />,
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
