import styles from './Main.module.scss';

const MainPage = () => {
  const contents = [
    '국내 추천 여행',
    '인기 여행',
    '일찍 준비하는 여름휴가',
    '지금이 딱 예약할 때!'
  ];

  return (
    <>
      {contents.map((content) => (
        <section className={styles.main_cards_section} key={content}>
          <h2 className={styles.main_cards_section_title}>{content}</h2>
          <div>Card</div>
        </section>
      ))}
    </>
  );
};

export default MainPage;
