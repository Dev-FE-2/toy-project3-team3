import * as S from './DeferredLoader.styles';
import { useState } from 'react';

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

  const handleDeferred = () => {
    setTimeout(() => {
      setIsDeferred(true);
    }, 200);
  };

  if (!isDeferred) {
    handleDeferred();
    return null;
  }

  return <Loader />;
};

export default DeferredLoader;
