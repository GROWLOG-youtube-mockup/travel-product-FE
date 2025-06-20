import { useEffect, useMemo, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

import CardSlide from '../../components/Cards/CardSlide';
import LocationCardList from '../../components/Cards/LocationCardList';
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
const locationImages = [
  {
    name: '서울특별시',
    image:
      'https://cdn.pixabay.com/photo/2016/07/10/05/48/seoul-international-fireworks-festival-1507332_1280.jpg'
  },
  {
    name: '경상남도',
    image:
      'https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-2898-61f7-8051-0b5bdb4941ff/raw?se=2025-06-20T03%3A47%3A09Z&sp=r&sv=2024-08-04&sr=b&scid=1854b46b-5eae-55a3-975e-c1f307e3aa86&skoid=c953efd6-2ae8-41b4-a6d6-34b1475ac07c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-06-20T02%3A16%3A41Z&ske=2025-06-21T02%3A16%3A41Z&sks=b&skv=2024-08-04&sig=iQbmNeo7OqZ8EZgGV%2BBJQQZtvX/p5FnhhwaAQhgoLF4%3D'
  },
  {
    name: '경상북도',
    image: 'https://cdn.pixabay.com/photo/2021/09/29/06/55/yeongju-6666506_1280.jpg'
  },
  {
    name: '대구광역시',
    image: 'https://cdn.pixabay.com/photo/2022/02/06/10/39/south-korea-6996746_1280.jpg'
  },
  {
    name: '인천광역시',
    image: 'https://cdn.pixabay.com/photo/2016/10/20/07/47/songdo-incheon-korea-1754841_1280.jpg'
  },
  {
    name: '전라남도',
    image: 'https://cdn.pixabay.com/photo/2018/10/21/04/05/night-view-3762230_1280.jpg'
  },
  {
    name: '전라북도',
    image:
      'https://sdmntprcentralus.oaiusercontent.com/files/00000000-8300-61f5-9bc2-e828ec8b43b2/raw?se=2025-06-20T03%3A51%3A19Z&sp=r&sv=2024-08-04&sr=b&scid=c0f786f0-dd89-5186-a1ba-abe45058dff7&skoid=c953efd6-2ae8-41b4-a6d6-34b1475ac07c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-06-20T01%3A58%3A45Z&ske=2025-06-21T01%3A58%3A45Z&sks=b&skv=2024-08-04&sig=s/K4DKNMQve0UiJ%2BG3Iehl8N7HLsgvOI8vDNSxmuoLY%3D'
  },
  {
    name: '충청남도',
    image: 'https://cdn.pixabay.com/photo/2020/06/17/11/39/taian-5309184_1280.jpg'
  },
  {
    name: '충청북도',
    image: 'https://cdn.pixabay.com/photo/2017/06/08/07/08/korea-2382741_1280.jpg'
  },
  {
    name: '강원특별자치도',
    image: 'https://cdn.pixabay.com/photo/2019/07/21/18/30/mountain-4353332_1280.jpg'
  },
  {
    name: '세종특별자치시',
    image: 'https://cdn.pixabay.com/photo/2023/06/03/11/26/arboretum-8037495_1280.jpg'
  },
  {
    name: '광주광역시',
    image:
      'https://cdn.pixabay.com/photo/2022/10/06/09/29/national-asian-culture-center-7502312_1280.jpg'
  },
  {
    name: '대전광역시',
    image:
      'https://i.namu.wiki/i/eCCEs8QoAalSwbviU5ragOFtuSj13RrtNNNMK_yYxiaizY_crItKnJ98YLcfiv5DajEFq5YExI6NaKoV363negDzqi5Rfh_M_HiKazZxUjWFj3Qy3I6n38ovERZDNx3CO6VTp2tzX6NH6zdGd06L2g.webp'
  },
  {
    name: '울산광역시',
    image: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/homigot-4206783_1280.jpg'
  },
  {
    name: '부산광역시',
    image:
      'https://cdn.pixabay.com/photo/2023/01/12/06/16/gamcheon-culture-village-7713364_1280.jpg'
  },
  {
    name: '제주특별자치도',
    image: 'https://cdn.pixabay.com/photo/2019/06/11/07/36/shiroyama-hiji-peak-4266254_1280.jpg'
  },
  {
    name: '경기도',
    image: 'https://cdn.pixabay.com/photo/2019/11/01/05/50/suwon-4593383_1280.jpg'
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
      const imageUrl = locationImages.find((item) => item.name.includes(regionName))?.image ?? '';

      if (!acc.find((item) => item.title === regionName)) {
        acc.push({
          title: `${regionName}${regionDo}`,
          image: imageUrl,
          regionId: region.regionId
        });
      }

      return acc;
    }, []);
  }, [regions]);

  const handleLocationCardClick = (regionId: number) => {
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
        <LocationCardList
          locationCardList={regionList}
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
