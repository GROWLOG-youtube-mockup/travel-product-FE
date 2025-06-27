export const formatKoreanDate = (date: Date): string => {
  // 00월 00일 0요일
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const weekday = date.toLocaleDateString('ko-KR', { weekday: 'long' });

  return `${month}월 ${day}일 ${weekday}`;
};
