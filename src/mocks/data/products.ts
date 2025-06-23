// data/products.ts
export const products = [
  {
    product_id: 102,
    name: '전주 여름 방학 2박 5일',
    imageUrls: [
      'https://cdn.example.com/images/전주1.jpg',
      'https://cdn.example.com/images/전주2.jpg'
    ],
    price: 379298,
    stock_quantity: 24,
    duration: 6,
    sale_status: 2,
    type: 2,
    region: { regionId: 8, name: '전주', level: 2, parentId: 4 },
    tags: ['좋아요 😘']
  },
  {
    product_id: 103,
    name: '제주도 여름 방학 3박 3일',
    imageUrls: [
      'https://cdn.example.com/images/제주도1.jpg',
      'https://cdn.example.com/images/제주도2.jpg'
    ],
    price: 509406,
    stock_quantity: 10,
    duration: 6,
    sale_status: 1,
    type: 2,
    region: { regionId: 3, name: '제주도', level: 2, parentId: 2 },
    tags: ['좋아요 😘', 'Best 추천 👍']
  },
  {
    product_id: 104,
    name: '제주도 액티비티 5박 2일',
    imageUrls: [
      'https://cdn.example.com/images/제주도1.jpg',
      'https://cdn.example.com/images/제주도2.jpg'
    ],
    price: 792573,
    stock_quantity: 26,
    duration: 4,
    sale_status: 0,
    type: 4,
    region: { regionId: 3, name: '제주도', level: 2, parentId: 2 },
    tags: ['예약폭주 🎉']
  },
  {
    product_id: 105,
    name: '부산 패키지 2박 2일',
    imageUrls: [
      'https://cdn.example.com/images/부산1.jpg',
      'https://cdn.example.com/images/부산2.jpg'
    ],
    price: 502023,
    stock_quantity: 10,
    duration: 3,
    sale_status: 1,
    type: 1,
    region: { regionId: 20, name: '부산', level: 2, parentId: 1 },
    tags: ['예약폭주 🎉', '좋아요 😘']
  },
  {
    product_id: 106,
    name: '담양 여름 방학 1박 3일',
    imageUrls: [
      'https://cdn.example.com/images/담양1.jpg',
      'https://cdn.example.com/images/담양2.jpg'
    ],
    price: 203618,
    stock_quantity: 2,
    duration: 2,
    sale_status: 2,
    type: 2,
    region: { regionId: 28, name: '담양', level: 2, parentId: 7 },
    tags: ['예약폭주 🎉', '좋아요 😘', 'Best 추천 👍']
  },
  {
    product_id: 107,
    name: '경주 여름 방학 5박 3일',
    imageUrls: [
      'https://cdn.example.com/images/경주1.jpg',
      'https://cdn.example.com/images/경주2.jpg'
    ],
    price: 355774,
    stock_quantity: 27,
    duration: 2,
    sale_status: 1,
    type: 2,
    region: { regionId: 27, name: '경주', level: 2, parentId: 6 },
    tags: ['예약폭주 🎉', '좋아요 😘', 'Best 추천 👍']
  },
  {
    product_id: 108,
    name: '인제 자유 여행 5박 3일',
    imageUrls: [
      'https://cdn.example.com/images/인제1.jpg',
      'https://cdn.example.com/images/인제2.jpg'
    ],
    price: 675045,
    stock_quantity: 30,
    duration: 2,
    sale_status: 2,
    type: 0,
    region: { regionId: 29, name: '인제', level: 2, parentId: 3 },
    tags: ['Best 추천 👍', '좋아요 😘']
  },
  {
    product_id: 109,
    name: '강릉 패키지 4박 2일',
    imageUrls: [
      'https://cdn.example.com/images/강릉1.jpg',
      'https://cdn.example.com/images/강릉2.jpg'
    ],
    price: 152040,
    stock_quantity: 20,
    duration: 5,
    sale_status: 0,
    type: 1,
    region: { regionId: 22, name: '강릉', level: 2, parentId: 3 },
    tags: ['좋아요 😘']
  },
  {
    product_id: 110,
    name: '남해 여름 방학 1박 4일',
    imageUrls: [
      'https://cdn.example.com/images/남해1.jpg',
      'https://cdn.example.com/images/남해2.jpg'
    ],
    price: 537348,
    stock_quantity: 23,
    duration: 6,
    sale_status: 0,
    type: 2,
    region: { regionId: 24, name: '남해', level: 2, parentId: 4 },
    tags: ['예약폭주 🎉', '좋아요 😘']
  },
  {
    product_id: 111,
    name: '강릉 역사 탐방 1박 4일',
    imageUrls: [
      'https://cdn.example.com/images/강릉1.jpg',
      'https://cdn.example.com/images/강릉2.jpg'
    ],
    price: 741323,
    stock_quantity: 28,
    duration: 6,
    sale_status: 2,
    type: 3,
    region: { regionId: 22, name: '강릉', level: 2, parentId: 3 },
    tags: ['Best 추천 👍', '예약폭주 🎉', '좋아요 😘']
  },
  {
    product_id: 112,
    name: '경주 여름 방학 2박 2일',
    imageUrls: [
      'https://cdn.example.com/images/경주1.jpg',
      'https://cdn.example.com/images/경주2.jpg'
    ],
    price: 136552,
    stock_quantity: 27,
    duration: 5,
    sale_status: 2,
    type: 2,
    region: { regionId: 27, name: '경주', level: 2, parentId: 6 },
    tags: ['예약폭주 🎉']
  },
  {
    product_id: 113,
    name: '서울 역사 탐방 2박 5일',
    imageUrls: [
      'https://cdn.example.com/images/서울1.jpg',
      'https://cdn.example.com/images/서울2.jpg'
    ],
    price: 154831,
    stock_quantity: 22,
    duration: 4,
    sale_status: 2,
    type: 3,
    region: { regionId: 1, name: '서울', level: 2, parentId: 0 },
    tags: ['Best 추천 👍', '좋아요 😘']
  },
  {
    product_id: 114,
    name: '부산 자유 여행 1박 4일',
    imageUrls: [
      'https://cdn.example.com/images/부산1.jpg',
      'https://cdn.example.com/images/부산2.jpg'
    ],
    price: 487138,
    stock_quantity: 7,
    duration: 3,
    sale_status: 1,
    type: 0,
    region: { regionId: 20, name: '부산', level: 2, parentId: 1 },
    tags: ['예약폭주 🎉', '좋아요 😘']
  },
  {
    product_id: 115,
    name: '서울 패키지 4박 6일',
    imageUrls: [
      'https://cdn.example.com/images/서울1.jpg',
      'https://cdn.example.com/images/서울2.jpg'
    ],
    price: 532687,
    stock_quantity: 23,
    duration: 5,
    sale_status: 2,
    type: 1,
    region: { regionId: 1, name: '서울', level: 2, parentId: 0 },
    tags: ['좋아요 😘', '예약폭주 🎉']
  },
  {
    product_id: 116,
    name: '담양 역사 탐방 2박 2일',
    imageUrls: [
      'https://cdn.example.com/images/담양1.jpg',
      'https://cdn.example.com/images/담양2.jpg'
    ],
    price: 271056,
    stock_quantity: 21,
    duration: 3,
    sale_status: 0,
    type: 3,
    region: { regionId: 28, name: '담양', level: 2, parentId: 7 },
    tags: ['Best 추천 👍', '예약폭주 🎉', '좋아요 😘']
  },
  {
    product_id: 117,
    name: '인제 역사 탐방 3박 6일',
    imageUrls: [
      'https://cdn.example.com/images/인제1.jpg',
      'https://cdn.example.com/images/인제2.jpg'
    ],
    price: 464411,
    stock_quantity: 21,
    duration: 6,
    sale_status: 2,
    type: 3,
    region: { regionId: 29, name: '인제', level: 2, parentId: 3 },
    tags: ['예약폭주 🎉', '좋아요 😘', 'Best 추천 👍']
  },
  {
    product_id: 118,
    name: '속초 역사 탐방 3박 2일',
    imageUrls: [
      'https://cdn.example.com/images/속초1.jpg',
      'https://cdn.example.com/images/속초2.jpg'
    ],
    price: 779760,
    stock_quantity: 26,
    duration: 6,
    sale_status: 0,
    type: 3,
    region: { regionId: 26, name: '속초', level: 2, parentId: 3 },
    tags: ['좋아요 😘', 'Best 추천 👍']
  },
  {
    product_id: 119,
    name: '서울 여름 방학 1박 4일',
    imageUrls: [
      'https://cdn.example.com/images/서울1.jpg',
      'https://cdn.example.com/images/서울2.jpg'
    ],
    price: 146535,
    stock_quantity: 16,
    duration: 3,
    sale_status: 0,
    type: 2,
    region: { regionId: 1, name: '서울', level: 2, parentId: 0 },
    tags: ['좋아요 😘']
  },
  {
    product_id: 120,
    name: '서울 액티비티 2박 3일',
    imageUrls: [
      'https://cdn.example.com/images/서울1.jpg',
      'https://cdn.example.com/images/서울2.jpg'
    ],
    price: 253580,
    stock_quantity: 13,
    duration: 2,
    sale_status: 0,
    type: 4,
    region: { regionId: 1, name: '서울', level: 2, parentId: 0 },
    tags: ['예약폭주 🎉', 'Best 추천 👍', '좋아요 😘']
  },
  {
    product_id: 121,
    name: '인제 패키지 1박 2일',
    imageUrls: [
      'https://cdn.example.com/images/인제1.jpg',
      'https://cdn.example.com/images/인제2.jpg'
    ],
    price: 723602,
    stock_quantity: 28,
    duration: 4,
    sale_status: 2,
    type: 1,
    region: { regionId: 29, name: '인제', level: 2, parentId: 3 },
    tags: ['예약폭주 🎉']
  }
];
