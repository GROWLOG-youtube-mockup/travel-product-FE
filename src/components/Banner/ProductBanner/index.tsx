import Label from '../../atoms/Label/Label';
import ProductCardLocalRecommend from '../../Cards/ProductCardLocalRecommend';

import styles from './ProductBanner.module.scss';

const ProductBanner = () => {
  return (
    <div className={styles['product-banner']}>
      <div className={styles['product-banner__wrapper']}>
        <div className={styles['product-banner__text-area']}>
          <Label variant="title" style={{ fontWeight: 700 }}>
            지역명
          </Label>
          <Label variant="bodyText">배너 설명 텍스트입니다.</Label>
        </div>
        <div className={styles['product-banner__image-area']}>
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
            alt="지역 이미지"
          />
        </div>
      </div>
      <div className={styles['product-banner__region-bar-wrapper']}>
        <div className={styles['product-banner__region-bar']}>
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
