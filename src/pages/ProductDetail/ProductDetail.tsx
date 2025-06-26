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
  const [selectedData, setSelectedData] = useState({
    count: 0,
    date: new Date()
  });

  useEffect(() => {
    fetch('/products/' + productId)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  const handleSelectedCount = (num: number) => {
    setSelectedData((prev) => {
      const newCount = prev.count + num;
      return {
        ...prev,
        count: newCount < 0 ? 0 : newCount
      };
    });
  };

  const handleSelectedDate = (date: Date) => {
    setSelectedData((prev) => ({
      ...prev,
      date
    }));
  };

  const handleCart = () => {
    console.log('CLICK CART');
  };

  const handleReservation = () => {
    console.log('CLICK RESERVATION');
  };

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
            <ProductInfo
              title={product?.name ?? ''}
              description={product?.description ?? ''}
              info={product?.descriptionGroups ?? []}
            />
          </div>
        </div>
        <div className={styles.addCartBox}>
          <AddCart
            data={{
              title: product?.name ?? '',
              price: product?.price ?? 0,
              isSoldOut: product?.stock_quantity === 0
            }}
            selectedData={selectedData}
            handleSelectedCount={handleSelectedCount}
            handleCart={handleCart}
            handleReservation={handleReservation}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
