import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from '../App';
import Authorization from '../components/Authorization';
import AdminLayout from '../layouts/AdminLayout/AdminLayout';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import CheckoutLayout from '../layouts/CheckoutLayout/CheckoutLayout';
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';
import FindAccountLayout from '../layouts/FindAccountLayout/FindAccountLayout';
import UserEditLayout from '../layouts/UserEditLayout/UserEditLayout';
import UserLayout from '../layouts/UserLayout/UserLayout';
import AdminAdminsPage from '../pages/Admin/AdminAdmins/AdminAdmins';
import AdminLoginPage from '../pages/Admin/AdminLogin/AdminLogin';
import AdminLogsPage from '../pages/Admin/AdminLogs/AdminLogs';
import AdminOrdersPage from '../pages/Admin/AdminOrders/AdminOrders';
import AdminProductsPage from '../pages/Admin/AdminProducts/AdminProducts';
import AdminUsersPage from '../pages/Admin/AdminUsers/AdminUsers';
import CancelCompletePage from '../pages/CancelComplete/CancelComplete';
import CancelConfirmPage from '../pages/CancelConfirm/CancelConfirm';
import CancelProgressPage from '../pages/CancelProgress/CancelProgress';
import CartPage from '../pages/Cart/Cart';
import DevelopGoto from '../pages/DevelopGoto/DevelopGoto';
import ErrorPage from '../pages/Error/Error';
import FindAccountPage from '../pages/FindAccount/FindAccount';
import JoinMembershipPage from '../pages/JoinMembership/JoinMembership';
import LoginPage from '../pages/Login/Login';
import MainPage from '../pages/Main/Main';
import ModalExamplePage from '../pages/ModalExamplePage';
import MswTestPage from '../pages/MswTestpage';
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
        index: true, // 루트 경로('/')에서 보여질 페이지
        element: <DevelopGoto /> // 개발 시에만 사용할 페이지
      },
      {
        path: 'msw', // 루트 경로('/')에서 보여질 페이지
        element: <MswTestPage /> // Msw 테스트 페이지
      },
      {
        element: <DefaultLayout />, // 일반 사용자용 레이아웃
        children: [
          {
            path: 'main', // 루트 경로('/')에서 보여질 페이지
            element: <MainPage /> // 기존 HomePage 대신 MainPage를 홈으로 사용
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
            // 기능 구현 후 삭제 필요 @@@@@@@@@@@@@
            path: 'modal-example', // 모달 예제 페이지
            element: <ModalExamplePage />
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
            path: 'CancelConfirm',
            element: <CancelConfirmPage />
            // 레이아웃 설정을 위한 requiredRole 임시 주석 처리
            // requiredRole: 'USER'
          },
          {
            path: 'CancelProgress',
            element: <CancelProgressPage />
            // 레이아웃 설정을 위한 requiredRole 임시 주석 처리
            // requiredRole: 'USER'
          },
          {
            path: 'CancelComplete',
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
        // requiredRole: 'ADMIN',
        children: [
          {
            path: 'admin/admins',
            element: <AdminAdminsPage />
            // 레이아웃 설정을 위한 requiredRole 임시 주석 처리
            // requiredRole: 'SUPER_ADMIN'
          },
          {
            path: 'admin/logs',
            element: <AdminLogsPage />
          },
          {
            path: 'admin/orders',
            element: <AdminOrdersPage />
          },
          {
            path: 'admin/products',
            element: <AdminProductsPage />
          },
          {
            path: 'admin/users',
            element: <AdminUsersPage />
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
          },
          {
            path: 'Join',
            element: <JoinMembershipPage />
          }
        ]
      },
      {
        element: <FindAccountLayout />, // 인증 페이지용 레이아웃
        children: [
          {
            path: 'find-account',
            element: <FindAccountPage />
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
