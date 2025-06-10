import CardSlide from '../../components/Cards/CardSlide';
import LocationCardList from '../../components/Cards/LocationCardList';
import type { CardProps } from '../../type/card';

import styles from './Main.module.scss';

const MainPage = () => {
  const locationTitle = '한국 추천 여행지';
  const locationList = [
    {
      title: '서울',
      image:
        'https://cdn.pixabay.com/photo/2016/07/10/05/48/seoul-international-fireworks-festival-1507332_1280.jpg'
    },
    {
      title: '경기도',
      image: 'https://cdn.pixabay.com/photo/2018/05/15/23/02/football-stadium-3404535_1280.jpg'
    },
    {
      title: '강원도',
      image: 'https://cdn.pixabay.com/photo/2019/07/21/18/30/mountain-4353332_1280.jpg'
    },
    {
      title: '충청도',
      image: 'https://cdn.pixabay.com/photo/2020/06/17/11/39/taian-5309184_1280.jpg'
    },
    {
      title: '전라도',
      image: 'https://cdn.pixabay.com/photo/2020/09/02/04/16/image-5537275_1280.jpg'
    },
    {
      title: '경상도',
      image: 'https://cdn.pixabay.com/photo/2022/08/09/12/10/wolyeong-bridge-7374859_1280.jpg'
    },
    {
      title: '제주도',
      image: 'https://cdn.pixabay.com/photo/2019/06/11/07/36/shiroyama-hiji-peak-4266254_1280.jpg'
    }
  ];
  const contentsTitleList = [
    { title: '인기 여행', subtitle: '다른 여행객들이 많이 찾는 인기 여행 상품' },
    { title: '일찍 준비하는 여름휴가', subtitle: '오늘부터 준비!' },
    { title: '지금이 딱 예약할 때!', subtitle: '선착순 타임특가부터 다양한 헤택' },
    { title: '마감 임박', subtitle: '곧 예약 마감됩니다!' }
  ];
  const contents: CardProps[][] = [
    // TODO: 추후 API 연동 완료 시 수정해야 함.
    // index 0: longHeight
    [
      {
        styleName: 'longHeight',
        image: 'https://cdn.pixabay.com/photo/2022/04/28/19/47/republic-of-korea-7161860_1280.jpg',
        title: '제주 감성 여행',
        price: 130000
      },
      {
        styleName: 'longHeight',
        image: 'https://cdn.pixabay.com/photo/2017/01/26/02/17/food-2009596_1280.jpg',
        title: '대구 먹거리 투어',
        price: 60000
      },
      {
        styleName: 'longHeight',
        image: 'https://cdn.pixabay.com/photo/2018/10/05/14/39/sunset-3726030_1280.jpg',
        title: '일몰이 아름다운 해변',
        price: 105000
      },
      {
        styleName: 'longHeight',
        image: 'https://cdn.pixabay.com/photo/2020/03/18/23/58/chunnam-4945781_1280.jpg',
        title: '숲길 산책 힐링',
        price: 90000
      },
      {
        styleName: 'longHeight',
        image: 'https://cdn.pixabay.com/photo/2017/03/09/06/30/pool-2128578_1280.jpg',
        title: '스파 리조트 패키지',
        price: 150000
      }
    ],
    // index 1: longWidth
    [
      {
        styleName: 'longWidth',
        image: 'https://cdn.pixabay.com/photo/2013/01/17/02/17/busan-75137_1280.jpg',
        title: '여름 바다 여행',
        price: 140000
      },
      {
        styleName: 'longWidth',
        image: 'https://cdn.pixabay.com/photo/2018/05/31/00/13/cape-verde-3442859_1280.jpg',
        title: '고급 리조트 스테이',
        price: 200000
      },
      {
        styleName: 'longWidth',
        image: 'https://cdn.pixabay.com/photo/2015/03/18/17/45/rafting-679694_1280.jpg',
        title: '래프팅 체험 여행',
        price: 85000
      },
      {
        styleName: 'longWidth',
        image: 'https://cdn.pixabay.com/photo/2021/12/20/08/07/camping-6882479_1280.jpg',
        title: '감성 캠핑',
        price: 75000
      },
      {
        styleName: 'longWidth',
        image: 'https://cdn.pixabay.com/photo/2021/09/12/22/41/italy-6619559_1280.jpg',
        title: '오션뷰 숙소',
        price: 170000
      }
    ],
    // index 2: normal
    [
      {
        styleName: 'normal',
        image: 'https://cdn.pixabay.com/photo/2023/01/26/02/15/books-7744938_1280.jpg',
        title: '서울 강남 투어',
        price: 30000
      },
      {
        styleName: 'normal',
        image: 'https://cdn.pixabay.com/photo/2020/01/14/07/26/koreanstyle-house-4764298_1280.jpg',
        title: '북촌마을 투어',
        price: 25000
      },
      {
        styleName: 'normal',
        image: 'https://cdn.pixabay.com/photo/2015/06/29/10/32/busan-825441_1280.jpg',
        title: '부산 투어',
        price: 40000
      },
      {
        styleName: 'normal',
        image: 'https://cdn.pixabay.com/photo/2017/10/26/23/26/suncheon-bay-2892768_1280.jpg',
        title: '순천만 자연 탐방',
        price: 18000
      },
      {
        styleName: 'normal',
        image: 'https://cdn.pixabay.com/photo/2020/03/09/08/53/seorak-4915009_1280.jpg',
        title: '설악산 트래킹',
        price: 60000
      }
    ],
    // index 3: normal
    [
      {
        styleName: 'normal',
        image: 'https://cdn.pixabay.com/photo/2017/07/07/16/23/jeju-island-2481947_1280.jpg',
        title: '제주 올레길 산책',
        price: 120000
      },
      {
        styleName: 'normal',
        image: 'https://cdn.pixabay.com/photo/2022/08/31/15/06/seoul-7423589_1280.jpg',
        title: '서울 야경 투어',
        price: 80000
      },
      {
        styleName: 'normal',
        image: 'https://cdn.pixabay.com/photo/2018/11/26/08/20/haeundae-beach-3838960_1280.jpg',
        title: '부산 해운대 힐링',
        price: 95000
      },
      {
        styleName: 'normal',
        image: 'https://cdn.pixabay.com/photo/2019/02/28/16/30/asia-4026267_1280.jpg',
        title: '경주 역사 탐방',
        price: 70000
      },
      {
        styleName: 'normal',
        image: 'https://cdn.pixabay.com/photo/2022/09/30/04/27/mountains-7488621_1280.jpg',
        title: '강원도 트레킹',
        price: 110000
      }
    ]
  ];

  return (
    <>
      <section className={styles['main-cards-section']}>
        <div className={styles['main-cards-section__title']}>
          <h2 className={styles['main-cards-section__main-title']}>{locationTitle}</h2>
        </div>
        <LocationCardList LocationCardList={locationList} />
      </section>

      {contentsTitleList.map((item, index) => (
        <section className={styles['main-cards-section']} key={item.title}>
          <div className={styles['main-cards-section__title']}>
            <h2 className={styles['main-cards-section__title__main-title']}>{item.title}</h2>
            {item.subtitle && (
              <p className={styles['main-cards-section__title__subtitle']}>{item.subtitle}</p>
            )}
          </div>
          <CardSlide cardList={contents[index]} />
        </section>
      ))}
    </>
  );
};

export default MainPage;
