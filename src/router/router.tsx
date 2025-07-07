import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RequireAdminAccess from '@/components/Auth/RequireAdminAccess';
import RequireGuestAccess from '@/components/Auth/RequireGuestAccess';
import RequireUserAccess from '@/components/Auth/RequireUserAccess';

import App from '../App';
import Authorization from '../components/Authorization';
import AdminLayout from '../layouts/AdminLayout/AdminLayout';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import CheckoutLayout from '../layouts/CheckoutLayout/CheckoutLayout';
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';
import FindAccountLayout from '../layouts/FindAccountLayout/FindAccountLayout';
import UserEditLayout from '../layouts/UserEditLayout/UserEditLayout';
import UserLayout from '../layouts/UserLayout/UserLayout';
import ErrorPage from '../pages//Error/Error';
import AdminLoginPage from '../pages/Admin/AdminLogin/AdminLogin';
import AdminLogsPage from '../pages/Admin/AdminLogs/AdminLogs';
import AdminOrdersPage from '../pages/Admin/AdminOrders/AdminOrders';
import AdminProductsPage from '../pages/Admin/AdminProducts/AdminProducts';
import AdminUsersPage from '../pages/Admin/AdminUsers/AdminUsers';
import CancelCompletePage from '../pages/CancelComplete/CancelComplete';
import CancelConfirmPage from '../pages/CancelConfirm/CancelConfirm';
import CancelProgressPage from '../pages/CancelProgress/CancelProgress';
import CartPage from '../pages/Cart/Cart';
import FindAccountPage from '../pages/FindAccount/FindAccount';
import JoinMembershipPage from '../pages/JoinMembership/JoinMembership';
import LoginPage from '../pages/Login/Login';
import MainPage from '../pages/Main/Main';
import PaymentCompletePage from '../pages/PaymentComplete/PaymentComplete';
import PaymentProcessPage from '../pages/PaymentProcess/PaymentProcess';
import ProductPage from '../pages/Product/Product';
import ProductDetailPage from '../pages/ProductDetail/ProductDetail';
import ReservationPage from '../pages/Reservation/Reservation';
import UserPage from '../pages/User/User';
import UserEditPage from '../pages/UserEdit/UserEdit';

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
            element: <MainPage /> // 메인 페이지
          },
          {
            path: 'main',
            element: <MainPage />
          },
          {
            path: 'product',
            element: <ProductPage />
          },
          {
            path: 'product/:id',
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
          },
          {
            path: 'CancelConfirm/:id',
            element: <CancelConfirmPage />
            // 레이아웃 설정을 위한 requiredRole 임시 주석 처리
            // requiredRole: 'USER'
          },
          {
            path: 'CancelProgress/:id',
            element: <CancelProgressPage />
            // 레이아웃 설정을 위한 requiredRole 임시 주석 처리
            // requiredRole: 'USER'
          },
          {
            path: 'CancelComplete/:id',
            element: <CancelCompletePage />
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
            element: (
              <RequireUserAccess>
                <UserPage />
              </RequireUserAccess>
            )
          }
        ]
      },
      {
        element: <UserEditLayout />, // 정보 수정 레이아웃
        children: [
          {
            path: 'user-edit',
            element: (
              <RequireUserAccess>
                <UserEditPage />
              </RequireUserAccess>
            )
          }
        ]
      },
      {
        path: '/admin/login',
        element: <AdminLoginPage />
      },
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminProductsPage /> // /admin 진입 시 기본 페이지
          },
          {
            path: 'products',
            element: <AdminProductsPage />
          },
          {
            path: 'users',
            element: <AdminUsersPage />
          },
          {
            path: 'orders',
            element: <AdminOrdersPage />
          },
          {
            path: 'logs',
            element: (
              <RequireAdminAccess requireSuperAdmin>
                <AdminLogsPage />
              </RequireAdminAccess>
            )
          }
        ]
      },
      {
        element: <AuthLayout />, // 인증 페이지용 레이아웃
        children: [
          {
            path: 'login',
            element: (
              <RequireGuestAccess>
                <LoginPage />
              </RequireGuestAccess>
            )
          },
          {
            path: 'Join',
            element: (
              <RequireGuestAccess>
                <JoinMembershipPage />
              </RequireGuestAccess>
            )
          }
        ]
      },
      {
        element: <FindAccountLayout />, // 인증 페이지용 레이아웃
        children: [
          {
            path: 'find-account',
            element: (
              <RequireGuestAccess>
                <FindAccountPage />
              </RequireGuestAccess>
            )
          }
        ]
      },
      {
        path: 'error/:status',
        element: <ErrorPage />
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
