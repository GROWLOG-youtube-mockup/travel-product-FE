# 🛫 Travel Product Frontend

여행 상품 예약 및 장바구니 기능을 지원하는 웹 애플리케이션의 프론트엔드 프로젝트입니다.

React 기반으로 개발되었으며, 상태 관리는 Zustand, 데이터 패칭은 React Query로 구성되어 있습니다.

<br />

---

## 🚀 주요 기능

- 여행 상품 목록 조회
- 여행 상품 상세 정보 확인
- 장바구니 담기 및 삭제
- 예약 진행 및 주문 내역 확인
- 반응형 UI 지원

<br />

---

## 🧰 기술 스택

| 구분         | 사용 기술                                |
|--------------|-------------------------------------------|
| **Framework** | React + TypeScript                       |
| **Build Tool**| Vite                                      |
| **State**     | Zustand, TanStack Query (React Query)    |
| **Style**     | SCSS (모듈 기반), CSS Modules             |
| **Routing**   | React Router                              |
| **API**       | axios 기반 RESTful API 통신               |
| **Testing**   | Vitest, React Testing Library             |
| **Linter & Formatter** | ESLint, Stylelint, Prettier, Husky |

<br />

---

## 📸 Screenshots

### 사용자 페이지
![image](https://github.com/user-attachments/assets/21b6007a-b58e-46b8-abb3-0f3de5eb478f)

<br />

<br />

### 관리자 페이지
![image](https://github.com/user-attachments/assets/ca92255a-68be-4b7c-a2b6-329398fc50b4)

<br />

---

## 📁 디렉토리 구조 예시

```bash
src/
├── assets/         # 이미지 등 정적 리소스
├── components/     # 재사용 가능한 UI 컴포넌트
├── constants/      # 전역 상수
├── hooks/          # 공통 커스텀 훅
├── layouts/        # 페이지 레이아웃 및 공통 구조 컴포넌트
├── lib/            # API 인스턴스 및 외부 라이브러리 래퍼
├── pages/          # 라우트와 연결된 페이지 단위 컴포넌트
├── router/         # React Router 설정
├── store/          # Zustand 전역 상태 관리
├── styles/         # 전역 SCSS 스타일 및 변수
├── types/          # 전역 타입 정의
├── utils/          # 유틸리티 함수 모음
```

<br />

---

## ▶️ 설치 및 실행

```bash
# 패키지 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build
```

---

## 📚 참고 자료
- [React 공식 문서](https://react.dev/)
- [TanStack Query](https://tanstack.com/)
- [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)
- [Vite](https://vite.dev/)
