import { useEffect } from 'react';
import type { PropsWithChildren } from 'react';

interface PreventScrollObserverProps extends PropsWithChildren {
  isOpen?: boolean;
}

export default function ScrollPreventer({ isOpen = true, children }: PreventScrollObserverProps) {
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.height = '100%';
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100%';
    } else {
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
      document.body.style.overflow = '';
      document.body.style.height = '';
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [isOpen]);

  return <>{children}</>;
}
