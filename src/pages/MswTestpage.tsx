import React, { useState } from 'react';

import axios from 'axios';

// 1. 카테고리 타입
type Category =
  | 'AUTH'
  | 'USERS'
  | 'PRODUCTS'
  | 'CART'
  | 'ORDERS'
  | 'PAYMENTS'
  | 'REGIONS'
  | 'ADMIN'
  | 'DATA';

// 2. 공통 인터페이스
interface ApiItem {
  label: string;
  request: () => Promise<{ request: object; response: object }>;
}

interface LogEntry {
  id: number;
  category: Category;
  endpoint: string;
  request: object;
  response: object;
  error?: object;
}

// 3. 요청 ID 카운터
let logId = 1;

// 4. 전체 API 엔드포인트 정의 (완전판)
const apiMap: Record<Category, ApiItem[]> = {
  AUTH: [
    {
      label: '/auth/email/send',
      request: async () => {
        const req = { email: 'hong@example.com' };
        const res = await axios.post('/auth/email/send', req);
        return { request: req, response: res.data };
      }
    },
    {
      label: '/auth/email/verify',
      request: async () => {
        const req = { email: 'hong@example.com', code: '123456' };
        const res = await axios.post('/auth/email/verify', req);
        return { request: req, response: res.data };
      }
    },
    {
      label: '/auth/phone/send',
      request: async () => {
        const req = { phone_number: '01012345678' };
        const res = await axios.post('/auth/phone/send', req);
        return { request: req, response: res.data };
      }
    },
    {
      label: '/auth/phone/verify',
      request: async () => {
        const req = { phone_number: '01012345678', code: '654321' };
        const res = await axios.post('/auth/phone/verify', req);
        return { request: req, response: res.data };
      }
    },
    {
      label: '/auth/find-email',
      request: async () => {
        const req = { name: '홍길동', phone_number: '01012345678', code: '123456' };
        const res = await axios.post('/auth/find-email', req);
        return { request: req, response: res.data };
      }
    },
    {
      label: '/auth/reset-password',
      request: async () => {
        const req = { email: 'hong@example.com' };
        const res = await axios.post('/auth/reset-password', req);
        return { request: req, response: res.data };
      }
    },
    {
      label: '/auth/logout',
      request: async () => {
        const res = await axios.post('/auth/logout');
        return { request: {}, response: res.data };
      }
    }
  ],

  USERS: [
    {
      label: '/users/signup',
      request: async () => {
        const req = {
          name: '홍길동',
          email: 'hong@example.com',
          password: 'password123!',
          phone_number: '01012345678'
        };
        const res = await axios.post('/users/signup', req);
        return { request: req, response: res.data };
      }
    },
    {
      label: '/users/login',
      request: async () => {
        const req = { email: 'hong@example.com', password: 'password123!' };
        const res = await axios.post('/users/login', req);
        return { request: req, response: res.data };
      }
    },
    {
      label: '/users/me',
      request: async () => {
        const res = await axios.get('/users/me');
        return { request: {}, response: res.data };
      }
    }
  ],

  PRODUCTS: [
    {
      label: '/products',
      request: async () => {
        const res = await axios.get('/products');
        return { request: {}, response: res.data };
      }
    }
  ],

  CART: [
    {
      label: '/cart',
      request: async () => {
        const res = await axios.get('/cart');
        return { request: {}, response: res.data };
      }
    }
  ],

  ORDERS: [
    {
      label: '/orders',
      request: async () => {
        const res = await axios.get('/orders');
        return { request: {}, response: res.data };
      }
    }
  ],

  PAYMENTS: [
    {
      label: '/payments/5001',
      request: async () => {
        const res = await axios.get('/payments/5001');
        return { request: {}, response: res.data };
      }
    }
  ],

  REGIONS: [
    {
      label: '/regions',
      request: async () => {
        const res = await axios.get('/regions');
        return { request: {}, response: res.data };
      }
    }
  ],

  ADMIN: [
    {
      label: '/admin/dashboard',
      request: async () => {
        const res = await axios.get('/admin/dashboard');
        return { request: {}, response: res.data };
      }
    },
    {
      label: '/admin/admins',
      request: async () => {
        const res = await axios.get('/admin/admins');
        return { request: {}, response: res.data };
      }
    }
  ],

  DATA: [
    {
      label: 'Users Data',
      request: async () => {
        const res = await import('../mocks/data/users');
        return { request: {}, response: res.users };
      }
    },
    {
      label: 'Products Data',
      request: async () => {
        const res = await import('../mocks/data/products');
        return { request: {}, response: res.products };
      }
    },
    {
      label: 'Cart Data',
      request: async () => {
        const res = await import('../mocks/data/carts');
        return { request: {}, response: res.carts };
      }
    }
  ]
};

// -------------------------------------
// 메인 Playground 컴포넌트
const MswPlaygroundPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const handleApiCall = async (category: Category, apiItem: ApiItem) => {
    setLoading(true);
    try {
      const { request, response } = await apiItem.request();
      setLogs((prev) => [
        ...prev,
        { id: logId++, category, endpoint: apiItem.label, request, response }
      ]);
    } catch (err) {
      setLogs((prev) => [
        ...prev,
        {
          id: logId++,
          category,
          endpoint: apiItem.label,
          request: {},
          response: {},
          error: err instanceof Error ? { message: err.message } : { error: err }
        }
      ]);
      console.error('❌ 요청 중 에러:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      {/* 좌측 카테고리 메뉴 */}
      <div style={{ width: '220px', borderRight: '1px solid #ccc', padding: '16px' }}>
        <h2>MSW Playground</h2>
        {Object.keys(apiMap).map((cat) => (
          <button
            key={cat}
            style={{ marginBottom: '8px', width: '100%' }}
            onClick={() => setSelectedCategory(cat as Category)}
          >
            {cat}
          </button>
        ))}
        <button
          style={{ marginTop: '16px', background: '#ddd', width: '100%' }}
          onClick={() => setLogs([])}
        >
          Clear Logs
        </button>
      </div>

      {/* 우측 요청/응답 영역 */}
      <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
        {selectedCategory && (
          <div style={{ marginBottom: '24px' }}>
            <h3>Endpoints ({selectedCategory})</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {apiMap[selectedCategory].map((api) => (
                <button key={api.label} onClick={() => handleApiCall(selectedCategory, api)}>
                  {api.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && <div>⏳ 요청 중...</div>}

        {logs.map((log) => (
          <LogEntryView key={log.id} log={log} />
        ))}

        {logs.length === 0 && !loading && <div>요청 기록이 없습니다.</div>}
      </div>
    </div>
  );
};

// -------------------------------------
// 로그 렌더링
const LogEntryView: React.FC<{ log: LogEntry }> = ({ log }) => {
  return (
    <div
      style={{ marginBottom: '16px', padding: '16px', background: '#f9f9f9', borderRadius: '8px' }}
    >
      <h4>
        ✅ [{log.category}] {log.endpoint}
      </h4>

      <div>
        <strong>📤 Request:</strong>
        <pre style={{ background: '#eee', padding: '8px', borderRadius: '4px' }}>
          {JSON.stringify(log.request, null, 2)}
        </pre>
      </div>

      <div>
        <strong>📥 Response:</strong>
        <pre style={{ background: '#eee', padding: '8px', borderRadius: '4px' }}>
          {JSON.stringify(log.response, null, 2)}
        </pre>
      </div>

      {log.error && (
        <div style={{ color: 'red' }}>
          <strong>❌ Error:</strong>
          <pre>{JSON.stringify(log.error, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MswPlaygroundPage;
