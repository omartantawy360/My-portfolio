import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the user is on a mobile/tablet device.
 * Uses screen width, touch capability, and resize listener.
 */
const useIsMobile = (breakpoint: number = 1024): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia(`(max-width: ${breakpoint}px)`).matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    );
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.matchMedia(`(max-width: ${breakpoint}px)`).matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
      );
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
