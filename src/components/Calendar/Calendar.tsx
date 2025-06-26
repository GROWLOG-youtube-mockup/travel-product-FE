import ReactHorizontalDatePicker from 'react-horizontal-strip-datepicker';

import 'react-horizontal-strip-datepicker/dist/ReactHorizontalDatePicker.css';
import styles from './Calendar.module.scss';

const getThisSunday = (): Date => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0(일) ~ 6(토)
  const diff = 7 - dayOfWeek; // 오늘로부터 일요일까지 남은 일수

  const sunday = new Date(today);
  sunday.setDate(today.getDate() + diff);

  return sunday;
};

type CalenderProps = {
  handleSelectedDate: (date: Date) => void;
};

const Calender = ({ handleSelectedDate }: CalenderProps) => {
  const sunday = getThisSunday();
  const firstSunday = new Date(sunday);
  firstSunday.setDate(sunday.getDate() - 13);
  const week = ['월', '화', '수', '목', '금', '토', '일'];

  return (
    <div className={styles.box}>
      <ReactHorizontalDatePicker
        className={styles.datePicker}
        selectedDay={handleSelectedDate}
        enableScroll={true}
        enableDays={15}
        color={'#987876'}
      />
    </div>
  );
};

export default Calender;
