import { http, HttpResponse } from 'msw';

import { admins } from '../data/admins';
import { users } from '../data/users';

export const adminHandlers = [
  http.get('/admin/dashboard', () => {
    return HttpResponse.json({ total_users: 152, total_products: 48, total_orders: 103 });
  }),

  http.get('/admin/users', () => {
    return HttpResponse.json({
      content: users,
      totalElements: 152,
      totalPages: 16,
      currentPage: 1
    });
  }),

  http.patch('/admin/users/:user_id', async ({ params }) => {
    return HttpResponse.json({ user_id: params.user_id, updated_at: '2025-06-05T11:00:00Z' });
  }),

  http.delete('/admin/users/:user_id', async () => {
    return HttpResponse.json({ message: 'User deleted (soft delete) successfully' });
  }),

  http.get('/admin/admins', () => {
    return HttpResponse.json({ content: admins, totalElements: 3, currentPage: 1 });
  }),

  http.post('/admin/admins', () => {
    return HttpResponse.json({ message: '관리자 추가 완료' });
  }),

  http.get('/admin/logs', () => {
    return HttpResponse.json({
      content: [
        {
          log_id: 1,
          action_type: 2,
          target_type: 1,
          target_id: 102,
          timestamp: '2025-06-06T11:23:00Z',
          user_id: 2
        }
      ]
    });
  })
];
