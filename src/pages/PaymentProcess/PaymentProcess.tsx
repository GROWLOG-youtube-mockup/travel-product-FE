import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { loadTossPayments } from '@tosspayments/tosspayments-sdk';

import Button from '../../components/atoms/Button/Button';
import type { User } from '../../type/user';

import styles from './PaymentProcess.module.scss';

declare global {
  interface Window {
    PaymentWidget: any;
  }
}

const clientKey = import.meta.env.VITE_CLIENT_KEY;
const customerKey = import.meta.env.VITE_CUSTOMER_KEY;

const PaymentProcessPage = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState<{ currency: string; value: number }>({
    currency: 'KRW',
    value: 500000
  });
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/users/me');
        if (!res.ok) throw new Error('네트워크 오류');
        const data = await res.json();
        setUserInfo(data);
      } catch (err: any) {
        navigate('/error');
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchPaymentWidgets() {
      // ------  결제위젯 초기화 ------
      const tossPayments = await loadTossPayments(clientKey);
      // 회원 결제
      const paymentWidgets = tossPayments.widgets({
        customerKey
      });
      // 비회원 결제
      // const paymentWidgets = tossPayments.widgets({ customerKey: ANONYMOUS });

      setWidgets(paymentWidgets);
    }

    fetchPaymentWidgets();
  }, []);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (!widgets) return;

      // ------ 주문의 결제 금액 설정 ------
      await widgets.setAmount(amount);

      await Promise.all([
        // ------  결제 UI 렌더링 ------
        widgets.renderPaymentMethods({
          selector: '#payment-method',
          variantKey: 'DEFAULT'
        }),
        // ------  이용약관 UI 렌더링 ------
        widgets.renderAgreement({
          selector: '#agreement',
          variantKey: 'AGREEMENT'
        })
      ]);

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets]);

  useEffect(() => {
    if (!widgets) return;

    widgets.setAmount(amount);
  }, [widgets, amount]);

  return (
    <div className={styles.container}>
      <div className={styles.selectedPage}>
        <div>
          <span>예약 정보 확인</span>
        </div>
        <div className={styles.payment}>
          <span>결제 진행</span>
        </div>
      </div>

      <div className={styles.paymentContainer}>
        <div className={styles.wrapper}>
          <div className="box_section">
            {/* 결제 UI */}
            <div id="payment-method" />
            {/* 이용약관 UI */}
            <div id="agreement" />

            <div className={styles.amountWrapper}>
              <span className={styles.amountLabel}>결제 금액 : </span>
              <span className={styles.amountValue}>₩{amount.value.toLocaleString()}</span>
            </div>
            {/* 결제하기 버튼 */}
            <div className={styles.paymentButtonWrapper}>
              <div className={styles.conditionsWrapper}>이용 약관 & 취소/환불 규정</div>
              <Button
                className={styles.paymentButton}
                disabled={!ready}
                onClick={async () => {
                  if (!widgets) return;
                  try {
                    // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
                    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
                    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
                    await widgets.requestPayment({
                      orderId: 'GAlnHSE76Dt6YBp5M8Jcj',
                      orderName: '토스 티셔츠 외 2건',
                      successUrl: window.location.origin + '/payment-complete',
                      failUrl: window.location.origin + '/payment-process',
                      customerEmail: userInfo?.email,
                      customerName: userInfo?.name,
                      customerMobilePhone: userInfo?.phone_number
                    });
                  } catch (error) {
                    // 에러 처리하기
                    console.error(error);
                  }
                }}
              >
                결제하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessPage;
