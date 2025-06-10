import { useState } from 'react';

import Label from '../../components/atoms/Label/Label';
import ProductBanner from '../../components/Banner/ProductBanner';

import styles from './Product.module.scss';

const categories = [
  { key: 'best', label: 'Best 추천👍' },
  { key: 'reserve', label: '예약폭주🔥' },
  { key: 'like', label: '좋아요😍' },
  { key: 'mdpick', label: 'MD Pick ✨' },
  { key: 'last', label: '마감임박⏰' }
];

const ProductPage = () => {
  const [activeCategory, setActiveCategory] = useState('best');
  return (
    <div className={styles['product-page']}>
      <ProductBanner />

      <div className={styles['product-page__title-area']}>
        <div className={styles['product-page__title']}>
          <Label variant="title" style={{ fontWeight: 700 }}>
            지역명 상품 전체
          </Label>
          <Label variant="bodyText" style={{ fontWeight: 700 }}>
            00개의 상품이 있어요
          </Label>
        </div>
      </div>

      <div className={styles['product-page__category-bar']}>
        {categories.map((cat) => {
          // prettier-ignore
          const buttonClass = styles['product-page__category-bar__button'] + (activeCategory === cat.key ? ' ' + styles['product-page__category-bar__button--active'] : '');
          return (
            <button
              key={cat.key}
              className={buttonClass}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <div className={styles['product-page__grid-list']}>
        {Array(16)
          .fill(null)
          .map((_, idx) => (
            <div className={styles['product-page__card']} key={idx} />
          ))}
      </div>
    </div>
  );
};

export default ProductPage;
