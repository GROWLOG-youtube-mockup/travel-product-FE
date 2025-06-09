import { useState } from 'react';

import Button from '../../components/atoms/Button/Button';
import ProductBanner from '../../components/Banner/ProductBanner/ProductBanner';

import styles from './Product.module.scss';

const categories = [
  { key: 'best', label: 'Best 추천👍' },
  { key: 'reserve', label: '예약폭주🔥' },
  { key: 'like', label: '좋아요😍' },
  { key: 'mdpick', label: 'MD Pick ✨' },
  { key: 'last', label: '마감임박⏰' }
];

const localRecommends = Array(5).fill(null);
const REGIONS = ['강원', '경상', '전라', '충청', '수도권'];

const ProductPage = () => {
  const [activeCategory, setActiveCategory] = useState('best');
  const [region, setRegion] = useState('서울');

  return (
    <div className={styles.productPage}>
      <ProductBanner region={region} onRegionChange={setRegion} />

      {/* 상품 전체 타이틀/서브타이틀 */}
      <div
        style={{
          width: '1100px',
          margin: '40px auto 12px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: '22px',
            marginBottom: 4
          }}
        >
          {region} 상품 전체{' '}
          <span
            style={{
              fontWeight: 400,
              fontSize: '16px',
              color: '#888'
            }}
          >
            00개의 상품이 있어요
          </span>
        </div>
      </div>

      {/* 카테고리 버튼 */}
      <div className={styles.categoryBar}>
        {categories.map((cat) => (
          <Button
            key={cat.key}
            className={activeCategory === cat.key ? styles.activeCategory : ''}
            onClick={() => setActiveCategory(cat.key)}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* 상품 목록 그리드 */}
      <div className={styles.gridList}>
        {Array(8)
          .fill(null)
          .map((_, idx) => (
            <div className={styles.productCard} key={idx} />
          ))}
      </div>
    </div>
  );
};

export default ProductPage;
