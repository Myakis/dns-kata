import { useState, useEffect } from 'react';

/**
 * Кастомный хук, отслеживающий позицию прокрутки.
 *
 * @param {string} [scrollDirection='bottom'] - Направление прокрутки для отслеживания ('bottom' или 'top').
 * @param {number} [scrollValue=50] - Значение прокрутки в пикселях для срабатывания изменения состояния.
 * @returns {boolean} - Указывает, достигнуто ли заданное условие прокрутки.
 */

export const useOnScroll = (scrollDirection: string = 'bottom', scrollValue: number = 50): boolean => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollDirection === 'bottom') {
        setIsScrolled(window.scrollY > scrollValue);
      } else if (scrollDirection === 'top') {
        setIsScrolled(window.scrollY < scrollValue);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollDirection, scrollValue]);

  return isScrolled;
};
