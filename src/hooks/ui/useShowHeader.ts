import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/hooks';

const useShowHeader = () => {
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  const { user } = useAuth();

  useEffect(() => {
    if (!user && showHeader) setShowHeader(false);
    if (!user) return;

    const scrollTarget = document.getElementById('outlet');

    const handleScroll = () => {
      const currentScrollY = scrollTarget?.scrollTop || 0;

      if (currentScrollY) {
        // 스크롤 내릴 때 헤더 숨기기
        if (currentScrollY > lastScrollY.current) {
          setShowHeader(false);
        }
        // 스크롤 올릴 때 헤더 보이기
        else {
          setShowHeader(true);
        }

        lastScrollY.current = currentScrollY;
      }
    };

    scrollTarget?.addEventListener('scroll', handleScroll);

    return () => {
      scrollTarget?.removeEventListener('scroll', handleScroll);
    };
  }, [user, showHeader]);

  return showHeader;
};

export default useShowHeader;
