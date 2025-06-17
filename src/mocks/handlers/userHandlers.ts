import { http, HttpResponse } from 'msw';

import { users } from '../data/users';

export const userHandlers = [
  http.post('/users/signup', async () => {
    return HttpResponse.json({ user_id: 1, created_at: '2025-06-05T10:00:00Z' });
  }),

  http.post('/users/login', async () => {
    return HttpResponse.json({ token: 'JWT_TOKEN', user_id: 1, name: '홍길동' });
  }),

  http.get('/users/me', () => {
    return HttpResponse.json(users[0]);
  }),

  http.get('/users/me/trips', () => {
    return HttpResponse.json([
      {
        product_id: 101,
        title: '제주도 패키지여행',
        start_date: '2025-06-20',
        end_date: '2025-06-23',
        price: 99000
      },
      {
        product_id: 102,
        title: '강릉 당일치기 여행',
        start_date: '2025-05-01',
        end_date: '2025-05-01',
        price: 55000
      }
    ]);
  }),

  http.patch('/users/me/name', async () => {
    return HttpResponse.json({ message: '이름이 성공적으로 변경되었습니다.' });
  }),

  http.patch('/users/me/phone', async () => {
    return HttpResponse.json({ message: '전화번호가 성공적으로 변경되었습니다.' });
  }),

  http.post('/users/verify-password', async () => {
    return HttpResponse.json({ verified: true });
  }),

  http.put('/users/me/password', async () => {
    return HttpResponse.json({ message: 'Password updated successfully' });
  }),

  http.delete('/users/me', async () => {
    return HttpResponse.json({ message: 'Account deleted successfully' });
  })
];
