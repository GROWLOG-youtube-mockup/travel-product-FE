export const products = [
  {
    product_id: 101,
    name: '시드니 4박 5일 자유 여행',
    imageUrls: [
      'https://cdn.example.com/images/1.jpg',
      'https://cdn.example.com/images/2.jpg',
      'https://cdn.example.com/images/3.jpg'
    ],
    price: 1200000,
    stock_quantity: 12,
    duration: 5,
    sale_status: 1,
    type: 0,
    region: {
      regionId: 10,
      name: '시드니',
      level: 2,
      parentId: 5
    },
    description: '단양 8경 투어',
    total_quantity: 20,
    descriptionGroups: [
      {
        title: '포함사항',
        type: 0,
        items: [
          { content: '왕복 항공권' },
          { content: '호텔 5박 숙박' },
          { content: '공항 픽업 및 샌딩 서비스' }
        ]
      },
      {
        title: '불포함사항',
        type: 1,
        items: [{ content: '여행자 보험' }, { content: '개인 식비 및 개인 경비' }]
      },
      {
        title: '기타 참고사항',
        type: 2,
        items: [{ content: '출발 7일 전까지 전액 환불 가능' }]
      }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  }
];
