import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Label from '@/components/atoms/Label/Label';
import Card from '@/components/Cards/Card';
import { useGetApi } from '@/hooks/useGetAPI';
import { useRegionStore } from '@/store/RegionStore';

import styles from './Product.module.scss';

const categories = [
  { key: 'best', label: 'Best 추천 👍' },
  { key: 'reserve', label: '예약폭주 🎉' },
  { key: 'like', label: '좋아요 😘' },
  { key: 'mdpick', label: 'MD Pick ✨' },
  { key: 'last', label: '마감임박⏰' }
];

const ProductPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { selectedRegion } = useRegionStore();
  const { data, isError } = useGetApi('/products', {
    regionId: selectedRegion?.regionId?.toString()
  });

  const filteredProducts = useMemo(() => {
    if (!activeCategory) {
      return data?.data ?? [];
    } else {
      return data?.data.filter((product) => product.tags.includes(activeCategory || '')) ?? [];
    }
  }, [activeCategory, data?.data]);

  const handleCardClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  if (isError) navigate(`/error/${data?.error?.code}`);

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
            key={product.productId}
            styleName="normal"
            isGrid={true}
            productId={product.productId}
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
