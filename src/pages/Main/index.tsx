import CardSlide from '../../components/Cards/CardSlide';
import type { CardProps } from '../../type/card';

import styles from './Main.module.scss';

const MainPage = () => {
  const contentsTitleList = [
    '국내 추천 여행',
    '인기 여행',
    '일찍 준비하는 여름휴가',
    '지금이 딱 예약할 때!'
  ];
  const contents: CardProps[][] = [
    // TODO: 추후 API 연동 완료 시 수정해야 함.
    // index 0: longHeight
    [
      {
        styleName: 'longHeight',
        image: 'https://source.unsplash.com/400x300/?jeju,island',
        title: '제주 감성 여행',
        price: 130000
      },
      {
        styleName: 'longHeight',
        image: 'https://source.unsplash.com/400x300/?daegu,market',
        title: '대구 먹거리 투어',
        price: 60000
      },
      {
        styleName: 'longHeight',
        image: 'https://source.unsplash.com/400x300/?sunset,beach',
        title: '일몰이 아름다운 해변',
        price: 105000
      },
      {
        styleName: 'longHeight',
        image: 'https://source.unsplash.com/400x300/?forest,path',
        title: '숲길 산책 힐링',
        price: 90000
      },
      {
        styleName: 'longHeight',
        image: 'https://source.unsplash.com/400x300/?spa,resort',
        title: '스파 리조트 패키지',
        price: 150000
      }
    ],
    // index 1: longWidth
    [
      {
        styleName: 'longWidth',
        image: 'https://source.unsplash.com/400x300/?vacation,summer',
        title: '여름 바다 여행',
        price: 140000
      },
      {
        styleName: 'longWidth',
        image: 'https://source.unsplash.com/400x300/?island,resort',
        title: '고급 리조트 스테이',
        price: 200000
      },
      {
        styleName: 'longWidth',
        image: 'https://source.unsplash.com/400x300/?rafting,adventure',
        title: '래프팅 체험 여행',
        price: 85000
      },
      {
        styleName: 'longWidth',
        image: 'https://source.unsplash.com/400x300/?camping,site',
        title: '감성 캠핑',
        price: 75000
      },
      {
        styleName: 'longWidth',
        image: 'https://source.unsplash.com/400x300/?ocean,view',
        title: '오션뷰 숙소',
        price: 170000
      }
    ],
    // index 2: normal
    [
      {
        styleName: 'normal',
        image: 'https://source.unsplash.com/400x300/?travel,plan',
        title: '여행 플래너 추천',
        price: 30000
      },
      {
        styleName: 'normal',
        image: 'https://source.unsplash.com/400x300/?map,trip',
        title: '지도와 함께하는 여행',
        price: 25000
      },
      {
        styleName: 'normal',
        image: 'https://source.unsplash.com/400x300/?bag,packing',
        title: '여행 준비 키트',
        price: 40000
      },
      {
        styleName: 'normal',
        image: 'https://source.unsplash.com/400x300/?suncream,beach',
        title: '썬크림과 여름 준비물',
        price: 18000
      },
      {
        styleName: 'normal',
        image: 'https://source.unsplash.com/400x300/?suitcase,travel',
        title: '여행 캐리어 세트',
        price: 60000
      }
    ],
    // index 3: normal
    [
      {
        styleName: 'normal',
        image: 'https://source.unsplash.com/400x300/?korea,travel',
        title: '제주 올레길 산책',
        price: 120000
      },
      {
        styleName: 'normal',
        image: 'https://source.unsplash.com/400x300/?seoul,city',
        title: '서울 야경 투어',
        price: 80000
      },
      {
        styleName: 'normal',
        image: 'https://source.unsplash.com/400x300/?busan,beach',
        title: '부산 해운대 힐링',
        price: 95000
      },
      {
        styleName: 'normal',
        image: 'https://source.unsplash.com/400x300/?gyeongju,temple',
        title: '경주 역사 탐방',
        price: 70000
      },
      {
        styleName: 'normal',
        image: 'https://source.unsplash.com/400x300/?gangwon,mountain',
        title: '강원도 트레킹',
        price: 110000
      }
    ]
  ];

  return (
    <>
      {contentsTitleList.map((title, index) => (
        <section className={styles.main_cards_section} key={title}>
          <h2 className={styles.main_cards_section_title}>{title}</h2>
          <CardSlide cardList={contents[index]} />
        </section>
      ))}
    </>
  );
};

export default MainPage;
