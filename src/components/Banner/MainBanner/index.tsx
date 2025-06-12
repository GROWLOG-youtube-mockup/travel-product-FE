import styles from './MainBanner.module.scss';

const MainBanner = () => {
  return (
    <section className={styles['main-banner']}>
      <div className={styles['main-banner__image']}>
        <img src="https://cdn.pixabay.com/photo/2018/07/13/03/29/gangneung-3534851_960_720.jpg" />
      </div>
      <div className={styles['main-banner__title']}>
        <div className={styles['main-banner__title__text']}>
          <h1 className={styles['main-banner__title__text__main']}>어디로 여행갈래요?</h1>
          <p className={styles['main-banner__title__text__sub']}>
            최고의 여행 상품을 손 쉽게 찾아보세요
          </p>
        </div>
      </div>
    </section>
  );
};

export default MainBanner;
