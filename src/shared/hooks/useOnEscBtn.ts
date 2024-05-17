import { useRef, RefObject, useCallback, useEffect } from 'react';

export const useOnEscBtn = (callback: () => void) => {
  const ref: RefObject<any> = useRef(null);

  const handleKeydown = useCallback(
    (e: any) => {
      if (e.key === 'Escape') {
        callback();
      }
    },
    [callback]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.addEventListener('keydown', handleKeydown);
    };
  });

  return ref;
};
