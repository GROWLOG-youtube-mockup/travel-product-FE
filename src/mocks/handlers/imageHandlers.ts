import { http, HttpResponse } from 'msw';

export const imageHandlers = [
  // 이미지 업로드
  http.post('/images', async () => {
    return HttpResponse.json(
      [
        'https://s3.amazonaws.com/bucket/product-images/uuid1-img1.jpg',
        'https://s3.amazonaws.com/bucket/product-images/uuid2-img2.jpg'
      ],
      { status: 201 }
    );
  }),

  // 이미지 삭제
  http.delete('/images/:imageId', async () => {
    return HttpResponse.json({ message: 'Image deleted successfully' });
  })
];
