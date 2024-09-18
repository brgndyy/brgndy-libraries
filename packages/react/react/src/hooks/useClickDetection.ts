import { useEffect, useRef } from 'react';

interface ClickDetectionOptions {
  onOutsideClick: () => void;
  onInsideClick: () => void;
}

const useClickDetection = <T extends HTMLElement>({
  onOutsideClick,
  onInsideClick,
}: ClickDetectionOptions) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current) {
        if (ref.current.contains(event.target as Node)) {
          event.stopPropagation();
          onInsideClick();
        } else {
          onOutsideClick();
        }
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [onInsideClick, onOutsideClick]);

  return ref;
};

export default useClickDetection;
