// data/products.ts
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
    description: '호주 시드니 5일 여행',
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
  },
  {
    product_id: 102,
    name: '제주도 3박 4일 패키지',
    imageUrls: ['https://cdn.example.com/jeju1.jpg', 'https://cdn.example.com/jeju2.jpg'],
    price: 800000,
    stock_quantity: 30,
    duration: 4,
    sale_status: 1,
    type: 1,
    region: {
      regionId: 3,
      name: '제주도',
      level: 1,
      parentId: null
    },
    description: '아름다운 제주도에서의 힐링 여행',
    total_quantity: 50,
    descriptionGroups: [
      {
        title: '포함사항',
        type: 0,
        items: [{ content: '왕복 항공권' }, { content: '호텔 3박' }]
      },
      {
        title: '불포함사항',
        type: 1,
        items: [{ content: '여행자 보험' }]
      }
    ],
    created_at: '2025-06-05T11:00:00Z',
    updated_at: '2025-06-06T09:00:00Z'
  },
  {
    product_id: 103,
    name: '부산 해운대 투어',
    imageUrls: ['https://cdn.example.com/busan1.jpg'],
    price: 400000,
    stock_quantity: 5,
    duration: 2,
    sale_status: 0,
    type: 0,
    region: {
      regionId: 8,
      name: '부산',
      level: 1,
      parentId: null
    },
    description: '부산 해운대와 맛집 투어',
    total_quantity: 10,
    descriptionGroups: [],
    created_at: '2025-05-15T10:00:00Z',
    updated_at: '2025-05-18T10:00:00Z'
  }
];
