import { useEffect, RefObject } from 'react';

export const useClickOutside = (ref: RefObject<any>, callback: () => void, classname: string | null = null) => {
  useEffect(() => {
    const handleClick = (e: any) => {
      if (classname) {
        ref.current && !ref.current.contains(e.target) && !e.target.classList.contains(classname) ? callback() : null;
      } else {
        ref.current && !ref.current.contains(e.target) ? callback() : null;
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, callback, classname]);
};
