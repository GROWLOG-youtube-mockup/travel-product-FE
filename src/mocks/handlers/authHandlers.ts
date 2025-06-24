import { http, HttpResponse } from 'msw';

export const authHandlers = [
  http.post('/auth/email/send', async () => {
    return HttpResponse.json({
      success: true,
      data: { message: 'Verification email sent successfully' },
      error: null
    });
  }),

  http.post('/auth/email/verify', async () => {
    return HttpResponse.json({
      success: true,
      data: { verified: true },
      error: null
    });
  }),

  http.post('/auth/phone/send', async () => {
    return HttpResponse.json({
      success: true,
      data: { message: 'Verification code sent' },
      error: null
    });
  }),

  http.post('/auth/phone/verify', async () => {
    return HttpResponse.json({
      success: true,
      data: { verified: true },
      error: null
    });
  }),

  http.post('/auth/find-email', async () => {
    return HttpResponse.json({
      success: true,
      data: { email: 'hong@example.com' },
      error: null
    });
  }),

  http.post('/auth/reset-password', async () => {
    return HttpResponse.json({
      success: true,
      data: { message: 'Temporary password sent to your email' },
      error: null
    });
  }),

  http.post('/auth/logout', async () => {
    return HttpResponse.json({
      success: true,
      data: { message: '로그아웃 되었습니다.' },
      error: null
    });
  }),

  http.post('/auth/login', async () => {
    return HttpResponse.json({
      success: true,
      data: {
        userId: 0,
        name: '홍길동',
        accessToken: 'mocked-access-token'
      },
      error: null
    });
  })
];
