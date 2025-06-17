import { http, HttpResponse } from 'msw';

export const authHandlers = [
  http.post('/auth/email/send', async () => {
    return HttpResponse.json({ message: 'Verification code sent' });
  }),

  http.post('/auth/email/verify', async () => {
    return HttpResponse.json({ verified: true });
  }),

  http.post('/auth/phone/send', async () => {
    return HttpResponse.json({ message: 'Verification code sent' });
  }),

  http.post('/auth/phone/verify', async () => {
    return HttpResponse.json({ verified: true });
  }),

  http.post('/auth/find-email', async () => {
    return HttpResponse.json({ email: 'hong@example.com' });
  }),

  http.post('/auth/reset-password', async () => {
    return HttpResponse.json({ message: 'Temporary password sent to your email' });
  }),

  http.post('/auth/logout', async () => {
    return HttpResponse.json({ message: '로그아웃 되었습니다.' });
  })
];
