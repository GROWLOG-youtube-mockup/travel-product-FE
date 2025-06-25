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
    region: { regionId: 14, name: '전주', level: 2, parentId: 4 },
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
    region: { regionId: 18, name: '제주도', level: 2, parentId: 2 },
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
    region: { regionId: 18, name: '제주도', level: 2, parentId: 2 },
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
    region: { regionId: 3, name: '부산', level: 2, parentId: 1 },
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
    region: { regionId: 15, name: '담양', level: 2, parentId: 7 },
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
    region: { regionId: 16, name: '경주', level: 2, parentId: 6 },
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
    region: { regionId: 11, name: '인제', level: 2, parentId: 3 },
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
    region: { regionId: 11, name: '강릉', level: 2, parentId: 3 },
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
    imageUrls: ['https://cdn.pixabay.com/photo/2016/12/23/06/17/jung-dong-jin-1926871_1280.jpg'],
    price: 741323,
    description: '단양 8경 투어',
    stock_quantity: 28,
    duration: 6,
    sale_status: 2,
    type: 3,
    region: { regionId: 11, name: '강릉', level: 2, parentId: 3 },
    tags: ['Best 추천 👍', '예약폭주 🎉', '좋아요 😘']
  },
  {
    product_id: 112,
    name: '경주 여름 방학 2박 2일',
    imageUrls: [
      'https://cdn.pixabay.com/photo/2016/05/17/12/16/the-bulguksa-temple-1398010_1280.jpg',
      'https://cdn.pixabay.com/photo/2019/02/28/16/33/asia-4026271_1280.jpg'
    ],
    price: 136552,
    stock_quantity: 27,
    duration: 5,
    sale_status: 2,
    type: 2,
    region: { regionId: 16, name: '경주', level: 2, parentId: 6 },
    tags: ['예약폭주 🎉']
  },
  {
    product_id: 113,
    name: '서울 역사 탐방 2박 5일',
    imageUrls: [
      'https://cdn.pixabay.com/photo/2019/11/14/18/20/korea-4626820_1280.jpg',
      'https://cdn.pixabay.com/photo/2023/02/11/13/43/building-7782841_960_720.jpg',
      'https://cdn.pixabay.com/photo/2023/01/24/15/45/palace-7741339_1280.jpg'
    ],
    price: 154831,
    stock_quantity: 22,
    duration: 4,
    sale_status: 2,
    type: 3,
    region: { regionId: 2, name: '서울', level: 2, parentId: 0 },
    tags: ['Best 추천 👍', '좋아요 😘']
  },
  {
    product_id: 114,
    name: '부산 자유 여행 1박 4일',
    imageUrls: [
      'https://cdn.pixabay.com/photo/2016/10/17/07/53/busan-night-scene-1747130_1280.jpg',
      'https://cdn.pixabay.com/photo/2023/01/12/06/16/gamcheon-culture-village-7713364_1280.jpg',
      'https://cdn.pixabay.com/photo/2020/08/09/11/26/road-5475262_1280.jpg',
      'https://cdn.pixabay.com/photo/2018/03/15/13/42/skyscraper-3228264_1280.jpg'
    ],
    price: 487138,
    stock_quantity: 7,
    duration: 3,
    sale_status: 1,
    type: 0,
    region: { regionId: 3, name: '부산', level: 2, parentId: 1 },
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
    region: { regionId: 2, name: '서울', level: 2, parentId: 0 },
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
    region: { regionId: 15, name: '담양', level: 2, parentId: 7 },
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
    region: { regionId: 11, name: '인제', level: 2, parentId: 3 },
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
    region: { regionId: 11, name: '속초', level: 2, parentId: 3 },
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
    region: { regionId: 2, name: '서울', level: 2, parentId: 0 },
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
    region: { regionId: 2, name: '서울', level: 2, parentId: 0 },
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
    region: { regionId: 11, name: '인제', level: 2, parentId: 3 },
    tags: ['예약폭주 🎉']
  },
  // data/products.mock.ts

  /* 17개 광역( level 1 ) 지역에 대해
   - 최소 1개, 최대 4개
   - 총 30개 상품
   - API 스키마 그대로   */
  /* ---------- 서울 (3) ---------- */
  {
    product_id: 2001,
    name: '서울 시티투어 2박 3일',
    price: 298000,
    stock_quantity: 18,
    total_quantity: 30,
    duration: 3,
    sale_status: 1,
    type: 1,
    description: '경복궁·롯데타워·한강유람선을 즐기는 2박 3일 패키지',
    region: { regionId: 2, name: '서울', level: 1, parentId: 1 },
    imageUrls: [
      'https://cdn.pixabay.com/photo/2020/11/24/02/13/gyeongbok-palace-5771324_960_720.jpg'
    ],
    descriptionGroups: [
      {
        title: '포함사항',
        type: 0,
        items: [
          { content: '전용버스·가이드' },
          { content: '호텔 2박' },
          { content: '경복궁 입장권' }
        ]
      },
      {
        title: '불포함사항',
        type: 1,
        items: [{ content: '개인 음료·간식' }]
      },
      {
        title: '기타 참고사항',
        type: 2,
        items: [{ content: '한복 대여비 별도' }]
      }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  },
  {
    product_id: 2002,
    name: '서울 한강 액티비티 1일',
    price: 99000,
    stock_quantity: 25,
    total_quantity: 40,
    duration: 1,
    sale_status: 2,
    type: 4,
    description: '한강 카약·서핑·수상 레포츠를 하루 만끽!',
    region: { regionId: 2, name: '서울', level: 1, parentId: 1 },
    imageUrls: [
      'https://cdn.pixabay.com/photo/2023/02/11/13/43/building-7782841_960_720.jpg',
      'https://cdn.pixabay.com/photo/2023/01/24/15/45/palace-7741339_1280.jpg'
    ],
    descriptionGroups: [
      {
        title: '포함사항',
        type: 0,
        items: [{ content: '장비 대여·안전요원' }]
      },
      {
        title: '불포함사항',
        type: 1,
        items: [{ content: '샤워 키트' }]
      },
      {
        title: '기타 참고사항',
        type: 2,
        items: [{ content: '수영복·수건 개별 지참' }]
      }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  },
  {
    product_id: 2003,
    name: '서울 미식 투어 1박 2일',
    price: 186000,
    stock_quantity: 12,
    total_quantity: 25,
    duration: 2,
    sale_status: 0,
    type: 0,
    description: '광장시장·연남동·성수동 핫플 맛집 집중 공략!',
    region: { regionId: 2, name: '서울', level: 1, parentId: 1 },
    imageUrls: [
      'https://cdn.pixabay.com/photo/2018/03/26/15/46/korean-food-3263032_1280.jpg',
      'https://cdn.pixabay.com/photo/2014/04/17/05/18/namdaemun-market-326146_1280.jpg',
      'https://cdn.pixabay.com/photo/2014/04/17/05/18/namdaemun-market-326145_1280.jpg'
    ],
    descriptionGroups: [
      {
        title: '포함사항',
        type: 0,
        items: [{ content: '미식 가이드' }, { content: '게스트하우스 1박' }]
      },
      {
        title: '불포함사항',
        type: 1,
        items: [{ content: '식음료 실비' }]
      },
      {
        title: '기타 참고사항',
        type: 2,
        items: [{ content: '식당 대기시간 발생 가능' }]
      }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  },

  /* ---------- 부산 (2) ---------- */
  {
    product_id: 2004,
    name: '부산 오션뷰 패키지 2박 3일',
    price: 345000,
    stock_quantity: 20,
    total_quantity: 32,
    duration: 3,
    sale_status: 1,
    type: 1,
    description: '해운대 오션뷰 호텔과 감천문화마을 투어',
    region: { regionId: 3, name: '부산', level: 1, parentId: 1 },
    imageUrls: [
      'https://cdn.pixabay.com/photo/2017/08/31/03/00/foxtail-2699300_960_720.jpg',
      'https://cdn.pixabay.com/photo/2020/03/14/09/37/sun-rise-4930116_1280.jpg',
      'https://cdn.pixabay.com/photo/2019/08/25/08/44/haeundae-beach-4428975_1280.jpg',
      'https://cdn.pixabay.com/photo/2019/08/05/10/56/sea-4385761_1280.jpg'
    ],
    descriptionGroups: [
      {
        title: '포함사항',
        type: 0,
        items: [{ content: 'KTX 왕복' }, { content: '해운대 호텔 2박' }]
      },
      { title: '불포함사항', type: 1, items: [{ content: '자유식' }] },
      { title: '기타 참고사항', type: 2, items: [{ content: '야경 촬영 삼각대 추천' }] }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  },
  {
    product_id: 2005,
    name: '부산 씨푸드 데이투어',
    price: 88000,
    stock_quantity: 0,
    total_quantity: 24,
    duration: 1,
    sale_status: 2,
    type: 0,
    description: '국제시장·자갈치시장 신선 해산물 미식 투어',
    region: { regionId: 3, name: '부산', level: 1, parentId: 1 },
    imageUrls: [
      'https://cdn.pixabay.com/photo/2020/08/09/11/26/road-5475262_1280.jpg',
      'https://cdn.pixabay.com/photo/2020/08/09/11/26/road-5475263_1280.jpg'
    ],
    descriptionGroups: [
      {
        title: '포함사항',
        type: 0,
        items: [{ content: '전용버스·가이드' }]
      },
      {
        title: '불포함사항',
        type: 1,
        items: [{ content: '개별 식사비' }]
      },
      { title: '기타 참고사항', type: 2, items: [{ content: '해산물 알레르기 주의' }] }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  },

  /* ---------- 대구 (1) ---------- */
  {
    product_id: 2006,
    name: '대구 근대 골목 1일 투어',
    price: 65000,
    stock_quantity: 30,
    total_quantity: 50,
    duration: 1,
    sale_status: 1,
    type: 3,
    description: '3·1만세길·진골목 등 대구 근대 골목 탐방',
    region: { regionId: 4, name: '대구', level: 1, parentId: 1 },
    imageUrls: [
      'https://cdn.example.com/images/대구1.jpg',
      'https://cdn.example.com/images/대구2.jpg'
    ],
    descriptionGroups: [
      { title: '포함사항', type: 0, items: [{ content: '문화 해설사' }] },
      { title: '불포함사항', type: 1, items: [{ content: '중식' }] },
      { title: '기타 참고사항', type: 2, items: [{ content: '도보 이동 多' }] }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  },

  /* ---------- 인천 (2) ---------- */
  {
    product_id: 2007,
    name: '인천 차이나타운 & 개항장',
    price: 72000,
    stock_quantity: 22,
    total_quantity: 40,
    duration: 1,
    sale_status: 0,
    type: 2,
    description: '차이나타운·개항장 근대거리·월미도 당일 코스',
    region: { regionId: 5, name: '인천', level: 1, parentId: 1 },
    imageUrls: [
      'https://cdn.example.com/images/인천1.jpg',
      'https://cdn.example.com/images/인천2.jpg'
    ],
    descriptionGroups: [
      { title: '포함사항', type: 0, items: [{ content: '전용버스' }] },
      { title: '불포함사항', type: 1, items: [{ content: '자유식' }] },
      { title: '기타 참고사항', type: 2, items: [{ content: '짬뽕·짜장 시식권 별도' }] }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  },
  {
    product_id: 2008,
    name: '영종도 씨사이드 1박',
    price: 143000,
    stock_quantity: 15,
    total_quantity: 28,
    duration: 2,
    sale_status: 2,
    type: 1,
    description: '영종 씨사이드·을왕리 해수욕장 1박 2일 휴양',
    region: { regionId: 5, name: '인천', level: 1, parentId: 1 },
    imageUrls: [
      'https://cdn.example.com/images/인천3.jpg',
      'https://cdn.example.com/images/인천4.jpg'
    ],
    descriptionGroups: [
      { title: '포함사항', type: 0, items: [{ content: '리조트 1박 조식' }] },
      { title: '불포함사항', type: 1, items: [{ content: '바비큐' }] },
      { title: '기타 참고사항', type: 2, items: [{ content: '수영복 필수' }] }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  },

  /* ---------- 광주 (1) ---------- */
  {
    product_id: 2009,
    name: '광주 근대 예술 투어',
    price: 88000,
    stock_quantity: 18,
    total_quantity: 35,
    duration: 1,
    sale_status: 2,
    type: 3,
    description: '양림동 펭귄마을·문화전당·1913송정역시장',
    region: { regionId: 6, name: '광주', level: 1, parentId: 1 },
    imageUrls: [
      'https://cdn.example.com/images/광주1.jpg',
      'https://cdn.example.com/images/광주2.jpg'
    ],
    descriptionGroups: [
      { title: '포함사항', type: 0, items: [{ content: '문화 해설사' }] },
      { title: '불포함사항', type: 1, items: [{ content: '시장 자유식' }] },
      { title: '기타 참고사항', type: 2, items: [{ content: '사진 스폿 많음' }] }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  },

  /* ---------- 대전 (1) ---------- */
  {
    product_id: 2010,
    name: '대전 과학 체험 1일',
    price: 57000,
    stock_quantity: 24,
    total_quantity: 40,
    duration: 1,
    sale_status: 1,
    type: 4,
    description: '국립중앙과학관·엑스포과학공원 체험 프로그램',
    region: { regionId: 7, name: '대전', level: 1, parentId: 1 },
    imageUrls: [
      'https://cdn.example.com/images/대전1.jpg',
      'https://cdn.example.com/images/대전2.jpg'
    ],
    descriptionGroups: [
      { title: '포함사항', type: 0, items: [{ content: '입장권·체험비' }] },
      { title: '불포함사항', type: 1, items: [{ content: '중식' }] },
      { title: '기타 참고사항', type: 2, items: [{ content: '어린이 보호자 동반' }] }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  },

  /* ---------- 울산 (1) ---------- */
  {
    product_id: 2011,
    name: '울산 대왕암·일출 투어',
    price: 92000,
    stock_quantity: 21,
    total_quantity: 30,
    duration: 1,
    sale_status: 1,
    type: 2,
    description: '대왕암공원 일출·주전 벚꽃길 버스투어',
    region: { regionId: 8, name: '울산', level: 1, parentId: 1 },
    imageUrls: [
      'https://cdn.example.com/images/울산1.jpg',
      'https://cdn.example.com/images/울산2.jpg'
    ],
    descriptionGroups: [
      { title: '포함사항', type: 0, items: [{ content: '왕복 버스' }] },
      { title: '불포함사항', type: 1, items: [{ content: '조식' }] },
      { title: '기타 참고사항', type: 2, items: [{ content: '해돋이 방한복 지참' }] }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  },

  /* ---------- 세종 (1) ---------- */
  {
    product_id: 2012,
    name: '세종 호수공원 자전거 투어',
    price: 45000,
    stock_quantity: 30,
    total_quantity: 45,
    duration: 1,
    sale_status: 2,
    type: 4,
    description: '세종호수공원 자전거·수상택시 체험',
    region: { regionId: 9, name: '세종', level: 1, parentId: 1 },
    imageUrls: [
      'https://cdn.example.com/images/세종1.jpg',
      'https://cdn.example.com/images/세종2.jpg'
    ],
    descriptionGroups: [
      { title: '포함사항', type: 0, items: [{ content: '자전거 렌탈 2시간' }] },
      { title: '불포함사항', type: 1, items: [{ content: '보트료' }] },
      { title: '기타 참고사항', type: 2, items: [{ content: '헬멧 제공' }] }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  },

  /* ---------- 경기 (4) ---------- */
  {
    product_id: 2013,
    name: '수원 화성 & 행궁 1일',
    price: 69000,
    stock_quantity: 18,
    total_quantity: 28,
    duration: 1,
    sale_status: 0,
    type: 3,
    description: '수원 화성 행궁·박물관·야간조명 산책',
    region: { regionId: 10, name: '경기', level: 1, parentId: 1 },
    imageUrls: [
      'https://cdn.example.com/images/경기1.jpg',
      'https://cdn.example.com/images/경기2.jpg'
    ],
    descriptionGroups: [
      { title: '포함사항', type: 0, items: [{ content: '문화 해설사' }] },
      { title: '불포함사항', type: 1, items: [{ content: '중식' }] },
      { title: '기타 참고사항', type: 2, items: [{ content: '야간 한복 대여 추천' }] }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  },
  {
    product_id: 2014,
    name: '용인 에버랜드 자유이용권',
    price: 82000,
    stock_quantity: 50,
    total_quantity: 100,
    duration: 1,
    sale_status: 2,
    type: 4,
    description: '에버랜드 종일권 & Q-PASS 패키지',
    region: { regionId: 10, name: '경기', level: 1, parentId: 1 },
    imageUrls: [
      'https://cdn.example.com/images/경기3.jpg',
      'https://cdn.example.com/images/경기4.jpg'
    ],
    descriptionGroups: [
      { title: '포함사항', type: 0, items: [{ content: '에버랜드 입장권' }] },
      { title: '불포함사항', type: 1, items: [{ content: '식음료' }] },
      { title: '기타 참고사항', type: 2, items: [{ content: '주말 혼잡 주의' }] }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  },
  {
    product_id: 2015,
    name: '가평 레일바이크·자라섬',
    price: 56000,
    stock_quantity: 27,
    total_quantity: 40,
    duration: 1,
    sale_status: 1,
    type: 2,
    description: '레일바이크 & 남이섬 뱃길 포함 당일투어',
    region: { regionId: 10, name: '경기', level: 1, parentId: 1 },
    imageUrls: [
      'https://cdn.example.com/images/경기5.jpg',
      'https://cdn.example.com/images/경기6.jpg'
    ],
    descriptionGroups: [
      { title: '포함사항', type: 0, items: [{ content: '레일바이크 탑승권' }] },
      { title: '불포함사항', type: 1, items: [{ content: '남이섬 입장료' }] },
      { title: '기타 참고사항', type: 2, items: [{ content: '자전거 헬멧 제공' }] }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  },
  {
    product_id: 2016,
    name: '파주 임진각 평화 투어',
    price: 77000,
    stock_quantity: 19,
    total_quantity: 30,
    duration: 1,
    sale_status: 0,
    type: 3,
    description: 'DMZ 안보관·도라산전망대·임진각 평화누리',
    region: { regionId: 10, name: '경기', level: 1, parentId: 1 },
    imageUrls: [
      'https://cdn.example.com/images/경기7.jpg',
      'https://cdn.example.com/images/경기8.jpg'
    ],
    descriptionGroups: [
      { title: '포함사항', type: 0, items: [{ content: '버스·해설사' }] },
      { title: '불포함사항', type: 1, items: [{ content: '점심식사' }] },
      { title: '기타 참고사항', type: 2, items: [{ content: '신분증 필수' }] }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  },

  /* ---------- 강원 (2) ---------- */
  {
    product_id: 2017,
    name: '강릉 커피거리·경포대 1박',
    price: 158000,
    stock_quantity: 20,
    total_quantity: 32,
    duration: 2,
    sale_status: 1,
    type: 1,
    description: '강릉 커피거리 카페투어 & 경포대 일출',
    region: { regionId: 11, name: '강원', level: 1, parentId: 1 },
    imageUrls: [
      'https://cdn.example.com/images/강원1.jpg',
      'https://cdn.example.com/images/강원2.jpg'
    ],
    descriptionGroups: [
      { title: '포함사항', type: 0, items: [{ content: '카페 쿠폰 3매' }] },
      { title: '불포함사항', type: 1, items: [{ content: '개별 식사' }] },
      { title: '기타 참고사항', type: 2, items: [{ content: '겨울철 방한 필수' }] }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  },
  {
    product_id: 2018,
    name: '설악산 케이블카·속초 아바이마을',
    price: 99000,
    stock_quantity: 25,
    total_quantity: 40,
    duration: 1,
    sale_status: 2,
    type: 2,
    description: '설악산 국립공원·속초 중앙시장 먹거리',
    region: { regionId: 11, name: '강원', level: 1, parentId: 1 },
    imageUrls: [
      'https://cdn.example.com/images/강원3.jpg',
      'https://cdn.example.com/images/강원4.jpg'
    ],
    descriptionGroups: [
      { title: '포함사항', type: 0, items: [{ content: '버스 왕복·입장권' }] },
      { title: '불포함사항', type: 1, items: [{ content: '케이블카료' }] },
      { title: '기타 참고사항', type: 2, items: [{ content: '산행복 준비' }] }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  },

  /* ---------- 충북 (1) ---------- */
  {
    product_id: 2019,
    name: '충주 탄금대·중앙탑 둘레길',
    price: 68000,
    stock_quantity: 18,
    total_quantity: 28,
    duration: 1,
    sale_status: 0,
    type: 3,
    description: '충주호 유람선과 중앙탑 둘레길 걷기',
    region: { regionId: 12, name: '충북', level: 1, parentId: 1 },
    imageUrls: [
      'https://cdn.example.com/images/충북1.jpg',
      'https://cdn.example.com/images/충북2.jpg'
    ],
    descriptionGroups: [
      { title: '포함사항', type: 0, items: [{ content: '유람선 탑승권' }] },
      { title: '불포함사항', type: 1, items: [{ content: '점심식사' }] },
      { title: '기타 참고사항', type: 2, items: [{ content: '편한 운동화' }] }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  },

  /* ---------- 충남 (2) ---------- */
  {
    product_id: 2020,
    name: '공주 무령왕릉·공산성',
    price: 62000,
    stock_quantity: 16,
    total_quantity: 30,
    duration: 1,
    sale_status: 1,
    type: 3,
    description: '백제 역사를 만나는 공주 하루 코스',
    region: { regionId: 13, name: '충남', level: 1, parentId: 1 },
    imageUrls: [
      'https://cdn.example.com/images/충남1.jpg',
      'https://cdn.example.com/images/충남2.jpg'
    ],
    descriptionGroups: [
      { title: '포함사항', type: 0, items: [{ content: '문화 해설사' }] },
      { title: '불포함사항', type: 1, items: [{ content: '중식' }] },
      { title: '기타 참고사항', type: 2, items: [{ content: '계단 多' }] }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  },
  {
    product_id: 2021,
    name: '태안 꽃지해변 노을 1박',
    price: 158000,
    stock_quantity: 12,
    total_quantity: 22,
    duration: 2,
    sale_status: 2,
    type: 1,
    description: '안면도 꽃지해변 노을 감상 & 갯벌 체험',
    region: { regionId: 13, name: '충남', level: 1, parentId: 1 },
    imageUrls: [
      'https://cdn.example.com/images/충남3.jpg',
      'https://cdn.example.com/images/충남4.jpg'
    ],
    descriptionGroups: [
      { title: '포함사항', type: 0, items: [{ content: '펜션 1박' }] },
      { title: '불포함사항', type: 1, items: [{ content: '갯벌 장화' }] },
      { title: '기타 참고사항', type: 2, items: [{ content: '썰물 시간 확인' }] }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  },

  /* ---------- 전북 (1) ---------- */
  {
    product_id: 2022,
    name: '전주 한옥마을 야간 투어',
    price: 73000,
    stock_quantity: 20,
    total_quantity: 32,
    duration: 1,
    sale_status: 2,
    type: 2,
    description: '한지 공예·야시장·전동 성당 라이트업',
    region: { regionId: 14, name: '전북', level: 1, parentId: 1 },
    imageUrls: [
      'https://cdn.example.com/images/전북1.jpg',
      'https://cdn.example.com/images/전북2.jpg'
    ],
    descriptionGroups: [
      { title: '포함사항', type: 0, items: [{ content: '해설 가이드' }] },
      { title: '불포함사항', type: 1, items: [{ content: '길거리 음식' }] },
      { title: '기타 참고사항', type: 2, items: [{ content: '한복 대여 할인쿠폰 제공' }] }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  },

  /* ---------- 전남 (1) ---------- */
  {
    product_id: 2023,
    name: '여수 밤바다 2박 3일',
    price: 246000,
    stock_quantity: 18,
    total_quantity: 35,
    duration: 3,
    sale_status: 1,
    type: 1,
    description: '낭만포차·케이블카·향일암 일출 포함',
    region: { regionId: 15, name: '전남', level: 1, parentId: 1 },
    imageUrls: [
      'https://cdn.example.com/images/전남1.jpg',
      'https://cdn.example.com/images/전남2.jpg'
    ],
    descriptionGroups: [
      { title: '포함사항', type: 0, items: [{ content: '호텔 2박' }] },
      { title: '불포함사항', type: 1, items: [{ content: '케이블카' }] },
      { title: '기타 참고사항', type: 2, items: [{ content: '밤바다 포차 대기 가능' }] }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  },

  /* ---------- 경북 (2) ---------- */
  {
    product_id: 2024,
    name: '안동 하회마을·탈춤 1일',
    price: 74000,
    stock_quantity: 22,
    total_quantity: 40,
    duration: 1,
    sale_status: 2,
    type: 3,
    description: '하회마을·도산서원·탈춤 공연 관람',
    region: { regionId: 16, name: '경북', level: 1, parentId: 1 },
    imageUrls: [
      'https://cdn.example.com/images/경북1.jpg',
      'https://cdn.example.com/images/경북2.jpg'
    ],
    descriptionGroups: [
      { title: '포함사항', type: 0, items: [{ content: '입장권·해설사' }] },
      { title: '불포함사항', type: 1, items: [{ content: '점심식사' }] },
      { title: '기타 참고사항', type: 2, items: [{ content: '전통의상 체험 가능' }] }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  },
  {
    product_id: 2025,
    name: '포항 호미곶·영일대 1박',
    price: 142000,
    stock_quantity: 15,
    total_quantity: 25,
    duration: 2,
    sale_status: 0,
    type: 1,
    description: '호미곶 일출·영일대 밤 산책',
    region: { regionId: 16, name: '경북', level: 1, parentId: 1 },
    imageUrls: [
      'https://cdn.example.com/images/경북3.jpg',
      'https://cdn.example.com/images/경북4.jpg'
    ],
    descriptionGroups: [
      { title: '포함사항', type: 0, items: [{ content: '펜션 1박' }] },
      { title: '불포함사항', type: 1, items: [{ content: '자유식' }] },
      { title: '기타 참고사항', type: 2, items: [{ content: '해변 모닥불 금지' }] }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  },

  /* ---------- 경남 (2) ---------- */
  {
    product_id: 2026,
    name: '통영 동피랑·욕지섬 1박 2일',
    price: 185000,
    stock_quantity: 17,
    total_quantity: 30,
    duration: 2,
    sale_status: 1,
    type: 1,
    description: '동피랑 벽화·욕지섬 바다낚시 체험',
    region: { regionId: 17, name: '경남', level: 1, parentId: 1 },
    imageUrls: [
      'https://cdn.example.com/images/경남1.jpg',
      'https://cdn.example.com/images/경남2.jpg'
    ],
    descriptionGroups: [
      { title: '포함사항', type: 0, items: [{ content: '게스트하우스 1박' }] },
      { title: '불포함사항', type: 1, items: [{ content: '낚시 장비' }] },
      { title: '기타 참고사항', type: 2, items: [{ content: '멀미약 준비' }] }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  },
  {
    product_id: 2027,
    name: '남해 독일마을·보리암',
    price: 132000,
    stock_quantity: 20,
    total_quantity: 35,
    duration: 1,
    sale_status: 2,
    type: 2,
    description: '남해 독일마을 & 금산 보리암 절경 버스투어',
    region: { regionId: 17, name: '경남', level: 1, parentId: 1 },
    imageUrls: [
      'https://cdn.example.com/images/경남3.jpg',
      'https://cdn.example.com/images/경남4.jpg'
    ],
    descriptionGroups: [
      { title: '포함사항', type: 0, items: [{ content: '왕복 버스·입장료' }] },
      { title: '불포함사항', type: 1, items: [{ content: '중식' }] },
      { title: '기타 참고사항', type: 2, items: [{ content: '계단 多' }] }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  },

  /* ---------- 제주 (3) ---------- */
  {
    product_id: 2028,
    name: '제주 올레길 걷기 3박 4일',
    price: 412000,
    stock_quantity: 14,
    total_quantity: 26,
    duration: 4,
    sale_status: 1,
    type: 2,
    description: '올레 7·8·9코스 트레킹 & 해녀 체험',
    region: { regionId: 18, name: '제주', level: 1, parentId: 1 },
    imageUrls: [
      'https://cdn.example.com/images/제주1.jpg',
      'https://cdn.example.com/images/제주2.jpg'
    ],
    descriptionGroups: [
      { title: '포함사항', type: 0, items: [{ content: '게스트하우스 3박' }] },
      { title: '불포함사항', type: 1, items: [{ content: '개인 장비' }] },
      { title: '기타 참고사항', type: 2, items: [{ content: '우천 시 일정 변경' }] }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  },
  {
    product_id: 2029,
    name: '제주 서쪽 해변 렌터카 2박',
    price: 286000,
    stock_quantity: 26,
    total_quantity: 40,
    duration: 3,
    sale_status: 2,
    type: 0,
    description: '협재·곽지·한림 공원 자유 일정',
    region: { regionId: 18, name: '제주', level: 1, parentId: 1 },
    imageUrls: [
      'https://cdn.example.com/images/제주3.jpg',
      'https://cdn.example.com/images/제주4.jpg'
    ],
    descriptionGroups: [
      { title: '포함사항', type: 0, items: [{ content: '렌터카 48h' }] },
      { title: '불포함사항', type: 1, items: [{ content: '유류·보험' }] },
      { title: '기타 참고사항', type: 2, items: [{ content: '운전면허 필수' }] }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  },
  {
    product_id: 2030,
    name: '제주 한라산 등반 당일',
    price: 98000,
    stock_quantity: 32,
    total_quantity: 50,
    duration: 1,
    sale_status: 0,
    type: 4,
    description: '백록담까지 한라산 정상 도전! 해설·간식 포함',
    region: { regionId: 18, name: '제주', level: 1, parentId: 1 },
    imageUrls: [
      'https://cdn.example.com/images/제주5.jpg',
      'https://cdn.example.com/images/제주6.jpg'
    ],
    descriptionGroups: [
      { title: '포함사항', type: 0, items: [{ content: '등산 가이드' }] },
      { title: '불포함사항', type: 1, items: [{ content: '등산 장비' }] },
      { title: '기타 참고사항', type: 2, items: [{ content: '사전 입산 예약' }] }
    ],
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-04T23:00:00Z'
  }
];
