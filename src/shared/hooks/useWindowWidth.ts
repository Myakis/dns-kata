import { useState, useEffect } from 'react';

/**
 * Кастомный хук, отслеживающий ширину окна.
 * @returns {number} - текущая ширина окна
 */

export const useWindowWidth = (): number => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowWidth;
};
