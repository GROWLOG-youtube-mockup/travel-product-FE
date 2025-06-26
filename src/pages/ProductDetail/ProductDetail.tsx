import 'dayjs/locale/ko';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import dayjs from 'dayjs';

import AddCart from '@/components/AddCart/AddCart';
import Calender from '@/components/Calendar/Calendar';
import ConfirmModal from '@/components/Modals/ConfirmModal';
import ProductInfo from '@/components/ProductInfo/ProductInfo';
import { useCartStore } from '@/store/CartStore';

import ImageGallery from '../../components/ImageGallery/ImageGallery';
import type { Product } from '../../type/product';

import styles from './ProductDetail.module.scss';

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const productId = pathname.split('/').pop();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedData, setSelectedData] = useState({
    count: 0,
    date: new Date()
  });
  const [isRefundOpen, setRefundOpen] = useState(false);
  const { setSelectedItem } = useCartStore();

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

  const openModal = () => {
    setRefundOpen(true);
  };

  const handleCart = async () => {
    await fetch('/cart', {
      method: 'POST',
      body: JSON.stringify({
        productId: productId ?? '',
        quantity: selectedData.count,
        startDate: dayjs(selectedData.date).format('YYYY-MM-DD')
      })
    })
      .then((response) => {
        navigate('/cart');
      })
      .catch((error) => {
        throw new Error('주문 생성 실패');
      });
  };

  const handleReservation = async () => {
    await fetch('/orders', {
      method: 'POST',
      body: JSON.stringify({
        items: [
          {
            peopleCount: selectedData.count,
            product_id: productId,
            start_date: dayjs(selectedData.date).format('YYYY-MM-DD')
          }
        ]
      })
    })
      .then((response) => {
        if (!productId || !product) throw new Error('상품 정보가 없습니다.');

        setSelectedItem({
          product: {
            product_id: Number(productId),
            name: product.name,
            thumbnail_image_url: product.imageUrls[0],
            price: product.price
          },
          quantity: selectedData.count,
          start_date: dayjs(selectedData.date).format('YYYY-MM-DD')
        });

        navigate('/reservation');
      })
      .catch((error) => {
        throw new Error('주문 생성 실패');
      });
  };

  return (
    <div className={styles.page}>
      <div className={styles.mainImage}>
        <ImageGallery images={product?.imageUrls ?? []} />
      </div>

      <div className={styles.grid}>
        <div className={styles.leftColumn}>
          <div className={styles.calendarBox}>
            <Calender handleSelectedDate={handleSelectedDate} />
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
            handleCart={openModal}
            handleReservation={handleReservation}
          />
        </div>
      </div>
      <ConfirmModal
        open={isRefundOpen}
        onClose={() => setRefundOpen(false)}
        handleConfirm={handleCart}
        title="장바구니에 추가 완료"
        subtitle="선택하신 인원과 날짜로 여행 상품을 장바구니에 성공적으로 추가하였습니다."
        contents="장바구니 페이지로 이동하여 여행 상품을 확인하시겠습니까?"
        boxWidth={500}
      />
    </div>
  );
};

export default ProductDetailPage;
