import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Router from './router/router';

import './styles/index.scss';

async function prepare() {
  console.log('🛠 prepare() 진입');

  try {
    if (import.meta.env.DEV) {
      console.log('🛠 DEV 모드 - MSW import 시작');
      const { worker } = await import('./mocks/browser');
      console.log('✅ worker import 완료');

      await worker.start({ onUnhandledRequest: 'bypass' });
      console.log('✅ worker start 완료');
    }
  } catch (err) {
    console.error('❌ prepare() 중 에러 발생:', err);
  }
}

prepare()
  .then(() => {
    console.log('✅ React 앱 렌더링 시작');
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <QueryClientProvider client={new QueryClient()}>
          <Router />
        </QueryClientProvider>
        d
      </StrictMode>
    );
  })
  .catch((err) => {
    console.error('❌ React 렌더링 실패:', err);
  });
