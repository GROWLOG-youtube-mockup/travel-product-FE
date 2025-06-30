import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

import PathTracker from '@/components/Auth/PathTracker';

function App() {
  return (
    <>
      <PathTracker />
      <Outlet />
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{
          top: '76px' // 헤더 높이(64px) + 여백(12px)
        }}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#333',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            fontSize: '14px',
            fontWeight: '500'
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff'
            },
            style: {
              border: '1px solid #10B981'
            }
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff'
            },
            style: {
              border: '1px solid #EF4444'
            }
          },
          loading: {
            iconTheme: {
              primary: '#3B82F6',
              secondary: '#fff'
            }
          }
        }}
      />
    </>
  );
}

export default App;
