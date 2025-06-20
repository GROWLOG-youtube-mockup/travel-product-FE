import { useEffect, useState } from 'react';

import CardSlide from '../../components/Cards/CardSlide';
import LocationCardList from '../../components/Cards/LocationCardList';
import type { Product } from '../../type/product';

import styles from './Main.module.scss';

type ContentsTitleList = {
  title: string;
  subtitle: string;
  styleName: 'normal' | 'longHeight' | 'longWidth';
};

const contentsTitleList: ContentsTitleList[] = [
  {
    title: '내 마음대로 떠나는 여행 🗺️',
    subtitle: '일정도 코스도 모두 자유롭게!',
    styleName: 'longHeight'
  },
  {
    title: '알차게 즐기는 패키지 🧳',
    subtitle: '교통·숙소 걱정 없이 편하게 떠나세요!',
    styleName: 'longWidth'
  },
  {
    title: '여름 방학 특가 진행 중 🏖️',
    subtitle: '방학 기간 한정, 지금 바로 예약하세요!',
    styleName: 'normal'
  },
  {
    title: '살아있는 역사 현장 🏛️',
    subtitle: '우리 문화유산을 직접 경험해보세요!',
    styleName: 'normal'
  },
  {
    title: '짜릿한 순간, 액티비티 🤿',
    subtitle: '지금 떠나면 모험이 기다립니다!',
    styleName: 'normal'
  }
];

const MainPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  const locationTitle = '한국 추천 여행지';
  const locationList = [
    {
      title: '서울',
      image:
        'https://cdn.pixabay.com/photo/2016/07/10/05/48/seoul-international-fireworks-festival-1507332_1280.jpg'
    },
    {
      title: '경기・인천',
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

  const handleLocationCardClick = (location: string) => {
    // 예: 상세 페이지 이동
    console.log('위치 카드 클릭:', location);
  };

  const handleCardClick = (product_id: number) => {
    // 예: 상세 페이지 이동
    console.log('카드 클릭:', product_id);
  };

  return (
    <>
      <section className={styles['cardsSection']}>
        <div className={styles['title']}>
          <h2 className={styles['mainTitle']}>{locationTitle}</h2>
        </div>
        <LocationCardList
          LocationCardList={locationList}
          handleLocationCardClick={handleLocationCardClick}
        />
      </section>

      {contentsTitleList.map((item, index) => (
        <section className={styles['cardsSection']} key={item.title}>
          <div className={styles['title']}>
            <h2 className={styles['mainTitle']}>{item.title}</h2>
            {item.subtitle && <p className={styles['subtitle']}>{item.subtitle}</p>}
          </div>
          <CardSlide
            productList={products.filter((product) => product?.type === index)}
            styleName={item.styleName ?? 'normal'}
            handleCardClick={handleCardClick}
          />
        </section>
      ))}
    </>
  );
};

export default MainPage;
