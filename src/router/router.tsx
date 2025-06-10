import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from '../App';
import Authorization from '../components/Authorization';
import AdminLayout from '../layouts/AdminLayout';
import AuthLayout from '../layouts/AuthLayout';
import CheckoutLayout from '../layouts/CheckoutLayout';
import DefaultLayout from '../layouts/DefaultLayout';
import UserEditLayout from '../layouts/UserEditLayout';
import UserLayout from '../layouts/UserLayout';
import Admin from '../pages/Admin/index';
import AdminLoginPage from '../pages/AdminLogin/index';
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
        element: <DefaultLayout />, // 일반 사용자용 레이아웃
        children: [
          {
            index: true, // 루트 경로('/')에서 보여질 페이지
            element: <MainPage /> // 기존 HomePage 대신 MainPage를 홈으로 사용
          },
          {
            path: 'product',
            element: <ProductPage />
          },
          {
            path: 'product/:id', // 동적 라우팅. 엔드포인트 관련 추가 논의 필요
            element: <ProductDetailPage />
          }
        ]
      },
      {
        element: <CheckoutLayout />, // 결제 관련 페이지 레이아웃
        children: [
          {
            path: 'reservation',
            element: <ReservationPage />
            // 레이아웃 설정을 위한 requiredRole 임시 주석 처리
            // requiredRole: 'USER'
          },
          {
            path: 'cart',
            element: <CartPage />
          },
          {
            path: 'payment-process',
            element: <PaymentProcessPage />
            // 레이아웃 설정을 위한 requiredRole 임시 주석 처리
            // requiredRole: 'USER'
          },
          {
            path: 'payment-complete',
            element: <PaymentCompletePage />
            // 레이아웃 설정을 위한 requiredRole 임시 주석 처리
            // requiredRole: 'USER'
          }
        ]
      },

      {
        element: <UserLayout />, // 마이페이지 레이아웃
        children: [
          {
            path: 'user',
            element: <UserPage />
            // 레이아웃 설정을 위한 requiredRole 임시 주석 처리
            // requiredRole: 'USER'
          }
        ]
      },
      {
        element: <UserEditLayout />, // 정보 수정 레이아웃
        children: [
          {
            path: 'user-edit',
            element: <UserEditPage />
            // 레이아웃 설정을 위한 requiredRole 임시 주석 처리
            // requiredRole: 'USER'
          }
        ]
      },
      {
        element: <AdminLayout />, // 관리자용 레이아웃
        children: [
          {
            path: 'admin',
            element: <Admin />
            // 레이아웃 설정을 위한 requiredRole 임시 주석 처리
            // requiredRole: 'ADMIN'
          },
          {
            path: 'admin/login',
            element: <AdminLoginPage />
          }
        ]
      },
      {
        element: <AuthLayout />, // 인증 페이지용 레이아웃
        children: [
          {
            path: 'login',
            element: <LoginPage />
          }
        ]
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
