/*
  вроде нормально принимает тип даты выдаваемый нашей апишкой,
  **только потом понял - можно просто скачать data-fns ( ´ω` )
*/

export const formatDate = (date: string): string => {
  const newDate: Date = new Date(date);
  const dateArr: number[] = [newDate.getDate(), newDate.getMonth() + 1];

  return `${dateArr.map((item) => (item < 10 ? `0${item}` : item)).join('.')}.${newDate.getFullYear()}`;
};
