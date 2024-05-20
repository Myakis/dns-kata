import { useRef, useCallback, useEffect } from 'react';

export const useOnEscBtn = (callback: () => void) => {
  const ref = useRef<any>(null);

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
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
