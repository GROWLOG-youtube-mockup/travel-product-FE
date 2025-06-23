import { useEffect, useMemo, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

import imageLinks from '@/constants/imageLinks';

import CardSlide from '../../components/Cards/CardSlide';
import RegionCardList from '../../components/Cards/RegionCardList';
import type { LocationItem } from '../../type/card';
import type { Product } from '../../type/product';
import type { Region } from '../../type/region';

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
const locationTitle = '한국 추천 여행지';

const MainPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    fetch('/regions')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setRegions(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  const regionList = useMemo(() => {
    return regions.reduce((acc: LocationItem[], region) => {
      const regionDo = region.name.includes('도') ? '도' : '';
      const regionName = region.name.slice(0, 2);
      const imageUrl = imageLinks.find((item) => item.name.includes(regionName))?.image ?? '';
      const findIndex = acc.findIndex((item) => item.title === `${regionName}${regionDo}`);

      if (!acc[findIndex]) {
        acc.push({
          title: `${regionName}${regionDo}`,
          image: imageUrl,
          regionId: region.regionId
        });
      }
      // else {
      //    acc[findIndex].regionId.push(region.regionId);
      // }

      return acc;
    }, []);
  }, [regions]);

  const handleRegionCardClick = (regionId: number) => {
    navigate({
      pathname: '/product',
      search: createSearchParams({
        regionId: regionId.toString()
      }).toString()
    });
  };

  const handleCardClick = (product_id: number) => {
    navigate(`/product/${product_id}`);
  };

  return (
    <>
      <section className={styles['cardsSection']}>
        <div className={styles['title']}>
          <h2 className={styles['mainTitle']}>{locationTitle}</h2>
        </div>
        <RegionCardList RegionCardList={regionList} handleRegionCardClick={handleRegionCardClick} />
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
