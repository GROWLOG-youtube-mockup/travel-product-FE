import ReactHorizontalDatePicker from 'react-horizontal-strip-datepicker';

import 'react-horizontal-strip-datepicker/dist/ReactHorizontalDatePicker.css';
import styles from './Calendar.module.scss';

type CalenderProps = {
  handleSelectedDate: (date: Date) => void;
};

const Calender = ({ handleSelectedDate }: CalenderProps) => {
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
