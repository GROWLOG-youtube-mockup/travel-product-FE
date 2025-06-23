import { useRegionStore } from '@/store/RegionStore';

import Label from '../../atoms/Label/Label';
import ProductCardLocalRecommend from '../../Cards/ProductCardLocalRecommend';

import styles from './ProductBanner.module.scss';

const ProductBanner = () => {
  const { selectedRegion } = useRegionStore();

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
          <ProductCardLocalRecommend>강원</ProductCardLocalRecommend>
          <ProductCardLocalRecommend>경상</ProductCardLocalRecommend>
          <ProductCardLocalRecommend>전라</ProductCardLocalRecommend>
          <ProductCardLocalRecommend>충청</ProductCardLocalRecommend>
          <ProductCardLocalRecommend>수도권</ProductCardLocalRecommend>
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;
