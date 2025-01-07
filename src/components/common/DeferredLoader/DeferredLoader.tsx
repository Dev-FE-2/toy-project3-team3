import * as S from './DeferredLoader.styles';
import { useState, useEffect } from 'react';

const Loader = () => {
  return (
    <S.LoadingContainer
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="로딩 중"
    />
  );
};

const DeferredLoader = () => {
  const [isDeferred, setIsDeferred] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsDeferred(true);
    }, 200);
    return () => clearTimeout(id);
  }, []);

  if (!isDeferred) {
    return null;
  }

  return <Loader />;
};

export default DeferredLoader;
