import styles from './Calendar.module.scss';

const getThisSunday = (): Date => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0(일) ~ 6(토)
  const diff = 7 - dayOfWeek; // 오늘로부터 일요일까지 남은 일수

  const sunday = new Date(today);
  sunday.setDate(today.getDate() + diff);

  return sunday;
};

const Calender = () => {
  const sunday = getThisSunday();
  const firstSunday = new Date(sunday);
  firstSunday.setDate(sunday.getDate() - 13);
  const week = ['월', '화', '수', '목', '금', '토', '일'];

  return (
    <div className={styles.box}>
      <div className={styles.weekWrapper}>
        {Array.from({ length: 14 }).map((_, index) => (
          <div className={styles.week} key={index}>
            {week[index % 7]}
          </div>
        ))}
      </div>
      <div className={styles.dateWrapper}>
        {Array.from({ length: 14 }).map((_, index) => (
          <div className={styles.date} key={index}>
            {firstSunday.getDate() + index}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calender;
