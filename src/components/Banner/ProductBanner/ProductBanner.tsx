import { useMemo } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

import RegionCardList from '@/components/Cards/RegionCardList';
import { useRegionStore } from '@/store/RegionStore';

import type { RegionItem } from '../../../type/card';
import Label from '../../atoms/Label/Label';

import styles from './ProductBanner.module.scss';

const regionDescriptions: Record<string, string> = {
  서울: '역사와 현대가 공존하는 매력적인 수도 서울을 만나보세요.',
  부산: '푸른 바다와 활기찬 도심이 어우러진 해양도시 부산 여행!',
  대구: '따뜻한 기후와 맛있는 먹거리로 가득한 정열의 도시 대구.',
  인천: '국제도시 인천에서 바다, 섬, 공항까지 다양한 즐거움을 경험하세요.',
  광주: '예술과 민주주의의 도시, 문화가 살아 숨 쉬는 광주.',
  대전: '과학과 자연이 어우러진 도심 속 힐링 도시 대전.',
  울산: '산과 바다, 산업과 자연이 공존하는 특별한 도시 울산.',
  세종: '조용하고 쾌적한 행정도시, 세종에서 여유로운 시간을.',
  경기: '서울 근교에서 자연과 도시를 동시에 즐길 수 있는 경기 여행.',
  강원: '청정 자연과 사계절 아름다움을 간직한 힐링 여행지 강원.',
  충북: '충북에서 만나는 산과 호수, 그리고 여유로운 전통의 멋.',
  충남: '서해 바다와 역사 유적이 어우러진 감성 여행지 충남.',
  전북: '한옥의 미와 전통 문화가 살아있는 전통의 고장 전북.',
  전남: '남도의 따뜻한 인심과 바다 풍경이 가득한 전남 여행.',
  경북: '신라 천년의 역사와 자연이 어우러진 문화의 중심 경북.',
  경남: '산과 바다, 전통과 현대가 함께하는 다채로운 매력의 경남.',
  제주: '푸른 바다와 이국적인 자연 풍광, 낭만 가득한 제주도.'
};

const ProductBanner = () => {
  const navigate = useNavigate();
  const { selectedRegion, regionList, setSelectedRegion, setRegionList } = useRegionStore();

  const handleRegionCardClick = (item: RegionItem) => {
    setSelectedRegion(item);
    setRegionList(regionList);

    navigate({
      pathname: '/product',
      search: createSearchParams({
        regionId: item.regionId.toString()
      }).toString()
    });
  };

  const filteredRegionList = useMemo(
    () => regionList.filter((region) => region.regionId !== selectedRegion?.regionId),
    [regionList, selectedRegion]
  );

  return (
    <div className={styles.banner}>
      <div className={styles.wrapper}>
        <div className={styles.textArea}>
          <h1 className={styles.title}>{selectedRegion?.title}</h1>
          <Label>{regionDescriptions[selectedRegion?.title || '서울']}</Label>
        </div>
        <div className={styles.imageArea}>
          <img src={selectedRegion?.image} alt="지역 이미지" />
        </div>
      </div>
      <div className={styles.regionBarWrapper}>
        <div className={styles.regionBar}>
          <RegionCardList
            RegionCardList={filteredRegionList}
            handleRegionCardClick={handleRegionCardClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;
