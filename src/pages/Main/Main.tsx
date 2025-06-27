import { useMemo } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

import imageLinks from '@/constants/imageLinks';
import Regions from '@/constants/regions';
import { useGetApi } from '@/hooks/useGetAPI';
import { useRegionStore } from '@/store/RegionStore';

import CardSlide from '../../components/Cards/CardSlide';
import RegionCardList from '../../components/Cards/RegionCardList';
import type { RegionItem } from '../../type/card';

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
  const navigate = useNavigate();
  const { setSelectedRegion, setRegionList, clearSelectedRegion, clearRegionList } =
    useRegionStore();
  const { data, isLoading, isError } = useGetApi('/products');
  const regions = Regions.reduce((acc: RegionItem[], region) => {
    if (!region.level || region.level !== 1) return acc;

    const imageUrl = imageLinks.find((item) => item.name === region.name)?.image ?? '';
    const findIndex = acc.findIndex((item) => item.title === region.name);

    if (!acc[findIndex]) {
      acc.push({
        title: region.name,
        image: imageUrl,
        regionId: region.region_id
      });
    }

    return acc;
  }, []);

  const filteredTitleList = useMemo(() => {
    return contentsTitleList.reduce((acc: ContentsTitleList[], item, index: number) => {
      const filteredProducts = data?.data?.filter((product) => product?.type === index) ?? [];

      if (filteredProducts.length > 0) acc.push(item);
      return acc;
    }, [] as ContentsTitleList[]);
  }, [data?.data]);

  const handleRegionCardClick = (item: RegionItem) => {
    setSelectedRegion(item);
    setRegionList(regions);

    navigate({
      pathname: '/product',
      search: createSearchParams({
        regionId: item.regionId.toString()
      }).toString()
    });
  };

  const handleCardClick = (productId: number) => {
    navigate(`/product/${productId}`);
    clearSelectedRegion();
    clearRegionList();
  };

  if (isError) navigate(`/error/${data?.error?.code}`);

  return (
    <>
      <section className={styles['cardsSection']}>
        <div className={styles['title']}>
          <h2 className={styles['mainTitle']}>{locationTitle}</h2>
        </div>
        <RegionCardList RegionCardList={regions} handleRegionCardClick={handleRegionCardClick} />
      </section>

      {filteredTitleList.map((item, index) => (
        <section className={styles['cardsSection']} key={item.title}>
          <div className={styles['title']}>
            <h2 className={styles['mainTitle']}>{item.title}</h2>
            {item.subtitle && <p className={styles['subtitle']}>{item.subtitle}</p>}
          </div>
          <CardSlide
            productList={data?.data?.filter((product) => product?.type === index) ?? []}
            styleName={item.styleName ?? 'normal'}
            handleCardClick={handleCardClick}
          />
        </section>
      ))}
    </>
  );
};

export default MainPage;
