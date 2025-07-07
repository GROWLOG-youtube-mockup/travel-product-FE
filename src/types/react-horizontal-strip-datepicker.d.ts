declare module 'react-horizontal-strip-datepicker' {
  import * as React from 'react';

  interface ReactHorizontalDatePickerProps {
    getSelectedDay?: (date: Date) => void;
    selectedDay?: (day: Date) => void;
    className?: string;
    enableScroll?: boolean;
    enableDays?: number;
    color?: string;
    enableDaysBefore?: Date;
    enableDaysAfter?: Date;
    textColor?: string;
    background?: string;
    borderRadius?: number;
    fontSize?: number;
    fontWeight?: string | number;
    showDaysAfterCurrentDate?: boolean;
    showDaysBeforeCurrentDate?: boolean;
  }

  const ReactHorizontalDatePicker: React.FC<ReactHorizontalDatePickerProps>;

  export default ReactHorizontalDatePicker;
}
