import { RefObject, useCallback, useEffect } from 'react';

// Пример работы хука:
// useClickOutside(<реф модалки>, <функция>, <класс кнопки, открывающей/закрывающей модалку>(необязательный параметр))
// useClickOutside(catalogRef, () => setIsOnCatalogBtnClick(false), styles['main-header__catalog-btn']);

export const useClickOutside = (ref: RefObject<any>, callback: () => void, classname: string | null = null) => {
  const handleClick = useCallback(
    (e: any) => {
      if (classname) {
        ref.current && !ref.current.contains(e.target) && !e.target.classList.contains(classname) ? callback() : null;
      } else {
        ref.current && !ref.current.contains(e.target) ? callback() : null;
      }
    },
    [ref, callback, classname]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, callback, classname, handleClick]);
};