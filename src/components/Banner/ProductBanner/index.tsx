import Label from '../../atoms/Label/Label';
import LocalRecommendCard from '../../Cards/product_Card-localRecommend';

import styles from './ProductBanner.module.scss';

const ProductBanner = () => {
  return (
    <div className={styles.topContainer}>
      <div className={styles.bannerWrapper}>
        <div className={styles.textArea}>
          <Label variant="title" style={{ fontWeight: 700 }}>
            지역명
          </Label>
          <Label variant="bodyText">배너 설명 텍스트입니다.</Label>
        </div>
        <div className={styles.imageArea}>
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
            alt="지역 이미지"
          />
        </div>
      </div>
      <div className={styles.regionBarWrapper}>
        <div className={styles.regionBar}>
          <LocalRecommendCard>강원</LocalRecommendCard>
          <LocalRecommendCard>경상</LocalRecommendCard>
          <LocalRecommendCard>전라</LocalRecommendCard>
          <LocalRecommendCard>충청</LocalRecommendCard>
          <LocalRecommendCard>수도권</LocalRecommendCard>
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;
