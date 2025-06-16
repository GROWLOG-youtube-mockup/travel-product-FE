import ImageGallery from '../../components/ImageGallery';

import styles from './ProductDetail.module.scss';

const ProductDetailPage = () => {
  const images = [
    '',
    '',
    '',
    '' // 실제 이미지 url로 교체 가능
  ];
  return (
    <div className={styles.page}>
      {/* 상단 이미지 갤러리 */}
      <div className={styles.mainImage}>
        <ImageGallery images={images} />
      </div>
      {/* 하단 2단 그리드 */}
      <div className={styles.grid}>
        <div className={styles.leftColumn}>
          <div className={styles.calendarBox}>calender</div>
          <div className={styles.infoBox}>product_info</div>
        </div>
        <div className={styles.addCartBox}>add cart</div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
