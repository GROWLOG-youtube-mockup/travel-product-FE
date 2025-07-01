import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from '@/components/atoms/Button/Button';
import Checkbox from '@/components/atoms/Checkbox/Checkbox';
import AgreementModal from '@/components/Modals/AgreementModal';
import { useGetApi } from '@/hooks/useGetAPI';
import { usePostApi } from '@/hooks/usePostAPI';

import styles from './CancelProgress.module.scss';

const CancelProgressPage = () => {
  const navigate = useNavigate();
  const [isTermsOpen, setTermsOpen] = useState(false);
  const [isRefundOpen, setRefundOpen] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const { pathname } = useLocation();
  const orderId = pathname.split('/').pop();
  const { data: orderRes } = useGetApi(`/orders/${orderId}`);
  const { mutate: cancelOrder } = usePostApi('/payments/cancel');

  const handleCancel = () => {
    cancelOrder(
      { orderId: Number(orderId ?? 0) },
      {
        onSuccess: (res) => {
          navigate(`/CancelComplete/${orderId}`);
        },
        onError: (err) => {
          // 1) 에러 로그
          navigate(`/error/${err.status}`);
        }
      }
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.selectedPage}>
        <div className={styles.reservation}>
          <span>결제 취소 확인</span>
        </div>
        <div>
          <span className={styles.nowPage}>결제 취소 진행</span>
        </div>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.item}>
          <Checkbox
            onChange={() => {
              setIsAgree(!isAgree);
            }}
            label="본인은 이용약관 및 취소/환불 규정을 확인하였으며, 이에 동의하고 결제 취소를
              진행합니다."
          ></Checkbox>
        </div>

        <div className={styles.info}>
          <div className={styles.agreement}>
            <span
              className={styles.agreementText}
              role="button"
              onClick={() => {
                setTermsOpen(true);
              }}
            >
              이용약관
            </span>{' '}
            &{' '}
            <span
              className={styles.agreementText}
              role="button"
              onClick={() => {
                setRefundOpen(true);
              }}
            >
              취소/환불 규정
            </span>
          </div>
          <div>
            <span>취소 금액: {(orderRes?.data?.total_price ?? 0).toLocaleString()}</span>
          </div>
          <div className={styles.buttonWrapper}>
            <Button className={styles.nextButton} onClick={handleCancel} disabled={!isAgree}>
              <span>결제취소</span>
            </Button>
          </div>
        </div>
      </div>

      <AgreementModal
        open={isTermsOpen}
        onClose={() => setTermsOpen(false)}
        title="이용약관"
        subtitle="예약 진행 시 본 약관에 동의한 것으로 간주되며,미확인으로 인한 불이익은 여행자 본인에게 있습니다."
        fileUrl="/terms.md"
        boxWidth={1100}
      />
      <AgreementModal
        open={isRefundOpen}
        onClose={() => setRefundOpen(false)}
        title="취소/환불 규정"
        subtitle="본 규정은 법적 효력이 있는 필수 약관으로,미확인으로 인한 불이익은 구매자 본인에게 있음을 알려드립니다."
        fileUrl="/refund-policy.md"
        boxWidth={1100}
      />
    </div>
  );
};

export default CancelProgressPage;
