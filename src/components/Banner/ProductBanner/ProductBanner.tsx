import { useMemo } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

import RegionCardList from '@/components/Cards/RegionCardList';
import { useRegionStore } from '@/store/RegionStore';

import type { RegionItem } from '../../../type/card';
import Label from '../../atoms/Label/Label';

import styles from './ProductBanner.module.scss';

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
          <Label style={{ fontWeight: 700 }}>{selectedRegion?.title}</Label>
          <Label>{selectedRegion?.description}</Label>
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
