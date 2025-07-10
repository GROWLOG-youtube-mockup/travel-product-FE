# 🛫 Travel Product Frontend

여행 상품 예약 및 장바구니 기능을 지원하는 웹 애플리케이션의 프론트엔드 프로젝트입니다.

React 기반으로 개발되었으며, 상태 관리는 Zustand, 데이터 패칭은 React Query로 구성되어 있습니다.

<br />

## 🚀 주요 기능

- 여행 상품 목록 조회
- 여행 상품 상세 정보 확인
- 장바구니 담기 및 삭제
- 예약 진행 및 주문 내역 확인
- 반응형 UI 지원

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

## ⚛️ Core

- **React** (TypeScript + TSX)
- **Vite** (프론트엔드 번들러)

<br />


---

## 🧭 Architecture

- **React Router** – 클라이언트 사이드 라우팅
- **Zustand** – 경량 전역 상태 관리
- **TanStack Query (React Query)** – 서버 상태 및 캐싱
- **axios** – HTTP 클라이언트

<br />


---

## 📝 Form Handling

- **React Hook Form** – 다중 입력 폼 처리에 최적화  
  - [공식 문서](https://react-hook-form.com/docs)  
  - [예제 코드](https://github.com/react-hook-form/react-hook-form/tree/master/examples)

<br />


---

## 🎨 Styling

- **SCSS (Sass)** – 모듈화된 스타일 작성

<br />

---

## 🧪 Testing

- **Vitest** – Vite 기반 테스트 러너
- **React Testing Library** – React 컴포넌트 테스트 도구

<br />

---

## ⚙️ 개발 도구

- **PNPM** – 빠르고 효율적인 패키지 매니저
- **Prettier** – 코드 포매터
- **ESLint / Stylelint** – JS/SCSS 코드 린팅
- **Husky + lint-staged** – 커밋 전 코드 검사 자동화 및 포맷팅

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
