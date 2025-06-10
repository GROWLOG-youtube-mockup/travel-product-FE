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
    <div className={styles['product-detail']}>
      {/* 상단 이미지 갤러리 */}
      <div className={styles['product-detail__main-image']}>
        <ImageGallery images={images} />
      </div>
      {/* 하단 2단 그리드 */}
      <div className={styles['product-detail__grid']}>
        <div className={styles['product-detail__left-column']}>
          <div className={styles['product-detail__calendar-box']}>calender</div>
          <div className={styles['product-detail__info-box']}>product_info</div>
        </div>
        <div className={styles['product-detail__add-cart-box']}>add cart</div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
