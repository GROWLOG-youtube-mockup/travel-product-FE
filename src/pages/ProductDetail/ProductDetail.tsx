import 'dayjs/locale/ko';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

import dayjs from 'dayjs';

import AddCart from '@/components/AddCart/AddCart';
import Calender from '@/components/Calendar/Calendar';
import ImageGallery from '@/components/ImageGallery/ImageGallery';
import LoadingSpinner from '@/components/LoadingSpinner';
import ConfirmModal from '@/components/Modals/ConfirmModal';
import ProductInfo from '@/components/ProductInfo/ProductInfo';
import { useAddCart } from '@/hooks/useAddCart';
import { useGetApi } from '@/hooks/useGetAPI';
import { usePostApi } from '@/hooks/usePostAPI';
import { handleApiError } from '@/lib/handleApiError';
import { useAuthStore } from '@/store/AuthStore';
import { useCartStore } from '@/store/CartStore';

import styles from './ProductDetail.module.scss';

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const productId = pathname.split('/').pop();
  const [selectedData, setSelectedData] = useState({
    count: 0,
    date: new Date()
  });
  const [isRefundOpen, setRefundOpen] = useState(false);
  const { setSelectedItem } = useCartStore();
  const { isLoggedIn } = useAuthStore();
  const usePostCart = useAddCart();
  const { data, isLoading } = useGetApi(`/products/${productId}`);
  const userRes = useGetApi(`/users/me`);
  const { mutate: createOrder } = usePostApi('/orders');

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
    if (!isLoggedIn) toast.error('로그인 후에 이용해주세요.');
    else setRefundOpen(true);
  };

  const handleCart = async (isMove: boolean) => {
    usePostCart.mutate(
      {
        productId: Number(productId),
        quantity: selectedData.count,
        startDate: dayjs(selectedData.date).format('YYYY-MM-DD')
      },
      {
        onSuccess: () => {
          if (isMove) navigate('/cart');
          else setRefundOpen(false);
        },
        onError: (err) => {
          handleApiError(err, navigate, location.pathname);
        }
      }
    );
  };

  const handleReservation = async () => {
    if (!isLoggedIn) toast.error('로그인 후에 이용해주세요.');
    else
      createOrder(
        {
          params: { email: userRes.data?.data?.email ?? '' },
          items: [
            {
              peopleCount: selectedData.count,
              product_id: Number(productId),
              start_date: dayjs(selectedData.date).format('YYYY-MM-DD')
            }
          ]
        },
        {
          onSuccess: (res) => {
            setSelectedItem({
              productId: Number(productId),
              cartItemId: 0,
              productName: data?.data?.name ?? '',
              price: data?.data?.price ?? 0,
              quantity: selectedData.count,
              startDate: dayjs(selectedData.date).format('YYYY-MM-DD'),
              stockQuantity: data?.data?.stockQuantity ?? 0,
              totalPrice: (data?.data?.price ?? 0) * selectedData.count,
              productImage: data?.data?.imageUrls[0] ?? '',
              ...res.data
            });
            navigate('/reservation');
          },
          onError: (err) => {
            handleApiError(err, navigate, location.pathname);
          }
        }
      );
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className={styles.page}>
      <div className={styles.mainImage}>
        <ImageGallery images={data?.data?.imageUrls ?? []} />
      </div>

      <div className={styles.grid}>
        <div className={styles.leftColumn}>
          <div className={styles.calendarBox}>
            <Calender handleSelectedDate={handleSelectedDate} />
          </div>
          <div className={styles.infoBox}>
            <ProductInfo
              title={data?.data?.name ?? ''}
              description={data?.data?.description ?? ''}
              info={data?.data?.descriptionGroups ?? []}
            />
          </div>
        </div>
        <div className={styles.addCartBox}>
          <AddCart
            data={{
              title: data?.data?.name ?? '',
              price: data?.data?.price ?? 0,
              isSoldOut: data?.data?.stockQuantity === 0
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
