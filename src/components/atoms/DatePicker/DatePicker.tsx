import React, { useEffect, useRef, useState } from 'react';

import styles from './DatePicker.module.scss';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'YYYY-MM-DD',
  className = '',
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ? new Date(value) : null);
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [isInitialClick, setIsInitialClick] = useState(false);

  // 달력 위치 계산 함수
  const calculateCalendarPosition = () => {
    if (!inputRef.current) return;

    const inputRect = inputRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const calendarHeight = 380;
    const calendarWidth = 280;

    let top = inputRect.bottom + 4;
    let left = inputRect.left;

    if (top + calendarHeight > viewportHeight) {
      top = inputRect.top - calendarHeight - 4;
    }

    if (left + calendarWidth > viewportWidth) {
      left = viewportWidth - calendarWidth - 16;
    }

    if (left < 16) {
      left = 16;
    }

    setCalendarPosition({ top, left });
  };

  // 달력 열기 함수 (이벤트 전파 방지 추가)
  const openCalendar = (e: React.MouseEvent | React.FocusEvent) => {
    if (disabled) return;

    // 이벤트 전파 방지
    e.stopPropagation();
    e.preventDefault();

    if (!isOpen) {
      setIsInitialClick(true);
      calculateCalendarPosition();
      setIsOpen(true);

      // 다음 프레임에서 초기 클릭 플래그 제거
      setTimeout(() => setIsInitialClick(false), 100);
    }
  };

  // 달력 토글 함수
  const toggleCalendar = (e: React.MouseEvent) => {
    if (disabled) return;

    e.stopPropagation();
    e.preventDefault();

    if (isOpen) {
      setIsOpen(false);
    } else {
      openCalendar(e);
    }
  };

  // 외부 클릭 감지 (수정됨)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 초기 클릭 중에는 외부 클릭 무시
      if (isInitialClick) return;

      const target = event.target as Node;

      // DatePicker 컨테이너나 달력 내부 클릭인지 확인
      if (containerRef.current?.contains(target) || calendarRef.current?.contains(target)) {
        return;
      }

      // 외부 클릭으로 판단되면 닫기
      setIsOpen(false);
    };

    const handleScroll = () => {
      if (isOpen) {
        calculateCalendarPosition();
      }
    };

    const handleResize = () => {
      if (isOpen) {
        calculateCalendarPosition();
      }
    };

    // 이벤트 리스너 등록 시 capture 옵션 사용
    if (isOpen) {
      // 짧은 지연 후 이벤트 리스너 등록 (초기 클릭 이벤트와 분리)
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside, true);
        window.addEventListener('scroll', handleScroll, true);
        window.addEventListener('resize', handleResize);
      }, 50);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside, true);
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isOpen, isInitialClick]);

  // value prop 변경 감지
  useEffect(() => {
    if (value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        setSelectedDate(date);
        setCurrentDate(date);
      }
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onChange(formatDate(date));
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDate(null);
    onChange('');
    setIsOpen(false);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const navigateYear = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setFullYear(newDate.getFullYear() - 1);
    } else {
      newDate.setFullYear(newDate.getFullYear() + 1);
    }
    setCurrentDate(newDate);
  };

  const getDaysInMonth = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: Date[] = [];

    // 이전 달의 마지막 날들
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push(prevDate);
    }

    // 현재 달의 날들
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    // 다음 달의 첫 날들 (42개까지 채우기)
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSameDay = (date1: Date | null, date2: Date): boolean => {
    if (!date1) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === currentDate.getMonth();
  };

  const monthNames = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월'
  ];

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div ref={containerRef} className={`${styles.datePicker} ${className}`}>
      <div className={styles.inputContainer}>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onClick={openCalendar}
          onFocus={openCalendar}
          placeholder={placeholder}
          disabled={disabled}
          className={`${styles.input} ${disabled ? styles.disabled : ''}`}
          readOnly={true}
        />
        <div className={styles.iconContainer}>
          {value && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className={styles.clearButton}
              title="날짜 지우기"
            >
              ✕
            </button>
          )}
          <button
            type="button"
            onClick={toggleCalendar}
            className={styles.calendarButton}
            disabled={disabled}
            title="달력 열기"
          >
            📅
          </button>
        </div>
      </div>

      {isOpen && !disabled && (
        <div
          ref={calendarRef}
          className={styles.calendar}
          style={{
            top: `${calendarPosition.top}px`,
            left: `${calendarPosition.left}px`
          }}
          onClick={(e) => e.stopPropagation()} // 달력 내부 클릭 시 이벤트 전파 방지
        >
          {/* 헤더 */}
          <div className={styles.calendarHeader}>
            <div className={styles.navSection}>
              <button
                type="button"
                onClick={() => navigateYear('prev')}
                className={styles.navButton}
                title="이전 년도"
              >
                ≪
              </button>
              <button
                type="button"
                onClick={() => navigateMonth('prev')}
                className={styles.navButton}
                title="이전 달"
              >
                ‹
              </button>
            </div>

            <div className={styles.monthYear}>
              <span className={styles.year}>{currentDate.getFullYear()}년</span>
              <span className={styles.month}>{monthNames[currentDate.getMonth()]}</span>
            </div>

            <div className={styles.navSection}>
              <button
                type="button"
                onClick={() => navigateMonth('next')}
                className={styles.navButton}
                title="다음 달"
              >
                ›
              </button>
              <button
                type="button"
                onClick={() => navigateYear('next')}
                className={styles.navButton}
                title="다음 년도"
              >
                ≫
              </button>
            </div>
          </div>

          {/* 요일 헤더 */}
          <div className={styles.weekHeader}>
            {weekDays.map((day) => (
              <div key={day} className={styles.weekDay}>
                {day}
              </div>
            ))}
          </div>

          {/* 날짜 그리드 */}
          <div className={styles.daysGrid}>
            {getDaysInMonth(currentDate).map((date, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleDateSelect(date)}
                className={`
                  ${styles.dayButton}
                  ${isSameDay(selectedDate, date) ? styles.selected : ''}
                  ${isToday(date) ? styles.today : ''}
                  ${!isCurrentMonth(date) ? styles.otherMonth : ''}
                `}
              >
                {date.getDate()}
              </button>
            ))}
          </div>

          {/* 푸터 */}
          <div className={styles.calendarFooter}>
            <button
              type="button"
              onClick={() => handleDateSelect(new Date())}
              className={styles.todayButton}
            >
              오늘
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedDate(null);
                onChange('');
                setIsOpen(false);
              }}
              className={styles.clearButtonFooter}
            >
              지우기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
