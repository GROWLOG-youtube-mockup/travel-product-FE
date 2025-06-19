import React, { useState } from 'react';

import AgreementModal from '../components/Modals/AgreementModal';
import DeleteAccountModal from '../components/Modals/DeleteAccountModal';
import SignupAccountModal from '../components/Modals/SignupAccountModal';

const ModalExamplePage: React.FC = () => {
  const [isTermsOpen, setTermsOpen] = useState(false);
  const [isRefundOpen, setRefundOpen] = useState(false);
  const [isSignupViewOpen, setSignupViewOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  return (
    <div>
      <h1>Modal Example Page</h1>
      <button onClick={() => setDeleteOpen(true)}>계정 탈퇴 모달</button>
      <button onClick={() => setSignupViewOpen(true)}>회원가입 조회 모달</button>
      <button onClick={() => setTermsOpen(true)}>이용약관 보기</button>
      <button onClick={() => setRefundOpen(true)}>취소/환불 규정 보기</button>

      <DeleteAccountModal open={isDeleteOpen} onClose={() => setDeleteOpen(false)} />
      <SignupAccountModal open={isSignupViewOpen} onClose={() => setSignupViewOpen(false)} />

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

export default ModalExamplePage;
