import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Card from '@/components/Cards/Card';
import { useRegionStore } from '@/store/RegionStore';

import Label from '../../components/atoms/Label/Label';
import type { Product } from '../../type/product';

import styles from './Product.module.scss';

const categories = [
  { key: 'best', label: 'Best 추천 👍' },
  { key: 'reserve', label: '예약폭주 🎉' },
  { key: 'like', label: '좋아요 😘' },
  { key: 'mdpick', label: 'MD Pick ✨' },
  { key: 'last', label: '마감임박⏰' }
];

const ProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const { selectedRegion } = useRegionStore();

  useEffect(() => {
    fetch('/products' + location.search)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, [location.search]);

  const filteredProducts = useMemo(() => {
    if (!activeCategory) {
      return products;
    } else {
      return products.filter((product) => product.tags.includes(activeCategory || ''));
    }
  }, [activeCategory, products]);

  const handleCardClick = (product_id: number) => {
    navigate(`/product/${product_id}`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.titleArea}>
        <div className={styles.title}>
          <Label style={{ fontWeight: 700 }}>{selectedRegion?.title} 상품 전체</Label>
          <Label style={{ fontWeight: 700 }}>{filteredProducts.length}개의 상품이 있어요</Label>
        </div>
      </div>

      <div className={styles.categoryBar}>
        <button className={styles.button} onClick={() => setActiveCategory(null)}>
          전체보기
        </button>
        {categories.map((cat) => {
          // prettier-ignore
          const buttonClass = styles.button + (activeCategory === cat.key ? ' ' + styles.buttonActive : '');
          return (
            <button
              key={cat.key}
              className={buttonClass}
              onClick={() => setActiveCategory(cat.label)}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <div className={styles.gridList}>
        {filteredProducts.map((product) => (
          <Card
            key={product.product_id}
            styleName="normal"
            isGrid={true}
            product_id={product.product_id}
            image={product.imageUrls[0]}
            title={product.name}
            price={product.price}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
