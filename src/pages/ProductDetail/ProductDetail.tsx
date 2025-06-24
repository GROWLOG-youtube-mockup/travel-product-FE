import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import AddCart from '@/components/AddCart/AddCart';
import Calender from '@/components/Calendar/Calendar';
import ProductInfo from '@/components/ProductInfo/ProductInfo';

import ImageGallery from '../../components/ImageGallery/ImageGallery';
import type { Product } from '../../type/product';

import styles from './ProductDetail.module.scss';

const ProductDetailPage = () => {
  const { pathname } = useLocation();
  const productId = pathname.split('/').pop();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch('/products/' + productId)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Product data:', data);
        setProduct(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.mainImage}>
        <ImageGallery images={product?.imageUrls ?? []} />
      </div>

      <div className={styles.grid}>
        <div className={styles.leftColumn}>
          <div className={styles.calendarBox}>
            <Calender />
          </div>
          <div className={styles.infoBox}>
            <ProductInfo />
          </div>
        </div>
        <div className={styles.addCartBox}>
          <AddCart />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
