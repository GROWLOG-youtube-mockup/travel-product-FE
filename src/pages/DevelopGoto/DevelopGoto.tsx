import { useNavigate } from 'react-router-dom';

import styles from './DevelopGoto.module.scss';

interface PageLink {
  label: string;
  path: string;
}

interface Section {
  title: string;
  pages: PageLink[];
}

const sections: Section[] = [
  {
    title: '메인 / 상품',
    pages: [
      { label: '메인(main)', path: '/main' },
      { label: '상품 목록', path: '/product' },
      { label: '상품 상세 (예시 ID: 1)', path: '/product/1' }
    ]
  },
  {
    title: '결제 / 예약',
    pages: [
      { label: '장바구니', path: '/cart' },
      { label: '예약', path: '/reservation' },
      { label: '결제 진행', path: '/payment-process' },
      { label: '결제 완료', path: '/payment-complete' },
      { label: '취소 확인', path: '/CancelConfirm' },
      { label: '취소 진행중', path: '/CancelProgress' },
      { label: '취소 완료', path: '/CancelComplete' }
    ]
  },
  {
    title: '유저 / 마이페이지',
    pages: [
      { label: '마이페이지', path: '/user' },
      { label: '회원정보 수정', path: '/user-edit' }
    ]
  },
  {
    title: '어드민',
    pages: [
      { label: '관리자 페이지', path: '/admin' },
      { label: '관리자 로그인', path: '/admin/login' }
    ]
  },
  {
    title: '인증 / 회원가입',
    pages: [
      { label: '로그인', path: '/login' },
      { label: '회원가입', path: '/Join' },
      { label: '계정찾기', path: '/find-account' }
    ]
  },
  {
    title: '기타',
    pages: [{ label: '모달 예제', path: '/modal-example' }]
  }
];

export default function DevelopGoto() {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🔧 개발용 빠른 이동</h1>
      {sections.map((section) => (
        <div key={section.title} className={styles.section}>
          <h2 className={styles.sectionTitle}>{section.title}</h2>
          <div className={styles.grid}>
            {section.pages.map((page) => (
              <div
                key={page.path}
                className={styles.card}
                onClick={() => handleNavigate(page.path)}
              >
                {page.label}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
