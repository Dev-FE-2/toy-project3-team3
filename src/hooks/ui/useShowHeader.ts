import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/hooks';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants';

const useShowHeader = () => {
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  const { pathname } = useLocation();
  const { HOME } = ROUTES;

  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setShowHeader(false);
      return;
    }

    const scrollTarget = document.getElementById('outlet');

    const handleScroll = () => {
      const currentScrollY = scrollTarget?.scrollTop || 0;

      if (pathname === HOME) {
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
      } else {
        setShowHeader(true);
      }
    };

    scrollTarget?.addEventListener('scroll', handleScroll);

    return () => {
      scrollTarget?.removeEventListener('scroll', handleScroll);
    };
  }, [user, showHeader, pathname]);

  return showHeader;
};

export default useShowHeader;
