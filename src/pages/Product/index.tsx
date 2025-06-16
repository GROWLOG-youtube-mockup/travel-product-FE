import { useState } from 'react';

import Label from '../../components/atoms/Label/Label';

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
    <div className={styles.page}>
      <div className={styles.titleArea}>
        <div className={styles.title}>
          <Label variant="title" style={{ fontWeight: 700 }}>
            지역명 상품 전체
          </Label>
          <Label variant="bodyText" style={{ fontWeight: 700 }}>
            00개의 상품이 있어요
          </Label>
        </div>
      </div>

      <div className={styles.categoryBar}>
        {categories.map((cat) => {
          // prettier-ignore
          const buttonClass = styles.button + (activeCategory === cat.key ? ' ' + styles.buttonActive : '');
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

      <div className={styles.gridList}>
        {Array(16)
          .fill(null)
          .map((_, idx) => (
            <div className={styles.card} key={idx} />
          ))}
      </div>
    </div>
  );
};

export default ProductPage;
