import styles from './ProductDetail.module.scss';

const ProductDetailPage = () => {
  return (
    <div className={styles.productDetailContainer}>
      {/* 상단 메인 이미지 */}
      <div className={styles.mainImage}>image container</div>
      {/* 하단 2단 그리드 */}
      <div className={styles.detailGridSimple}>
        <div className={styles.leftColumnSimple}>
          <div className={styles.calendarBox}>calender</div>
          <div className={styles.productInfoBox}>product_info</div>
        </div>
        <div className={styles.addCartBox}>add cart</div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
