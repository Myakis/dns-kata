import { useCallback, RefObject, useEffect, useRef } from 'react';

/**
 * ОПИСАНИЕ
 * @param callback колбек с действием при клике вне модалки
 * @param classname класс кнопки, открывающей/закрывающей модалку(необязательный параметр)
 * @returns ref модалки
 **/

export const useClickOutside = (callback: () => void, classname: string | null = null) => {
  const ref: RefObject<any> = useRef(null);

  const handleClick = useCallback(
    (e: any) => {
      if (classname) {
        !ref.current?.contains(e.target) && !e.target.classList.contains(classname) && callback();
      } else {
        !ref.current?.contains(e.target) && callback();
      }
    },
    [callback, classname]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handleClick]);

  return ref;
};
