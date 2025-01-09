import { useEffect, useState } from 'react';
import * as S from './ContentsHashtag.styles';
import { Button, Icon } from '@/components/common';
import { PlayListEditFormValues } from '@/types';
import { useFormContext } from 'react-hook-form';

const ContentsHashtag = () => {
  const [currentHashtag, setCurrentHashtag] = useState<string>('');

  const { register, watch, setValue } =
    useFormContext<PlayListEditFormValues>();
  const watchedHashtags = watch('hashtags');

  useEffect(() => {
    register('hashtags');
  }, [register]);

  const handleHashtagsChange = (newHashtags: string[]) => {
    setValue('hashtags', newHashtags);
  };

  const handleAddHashtag = () => {
    const trimmedInput = currentHashtag.trim();

    if (trimmedInput && !watchedHashtags.includes(trimmedInput)) {
      if (watchedHashtags.length < 10) {
        const updatedHashtags = [...watchedHashtags, currentHashtag];
        handleHashtagsChange(updatedHashtags);
        setCurrentHashtag('');
      } else {
        // 📌 10개까지만 추가 가능하다는 에러 메시지 추가
      }
    } else if (watchedHashtags.includes(trimmedInput)) {
      // 📌 이미 존재한다는 에러 메시지 추가
    }
  };

  const handleRemoveHashtag = (hashtag: string) => {
    const updatedHashtags = watchedHashtags.filter((tag) => tag !== hashtag);
    handleHashtagsChange(updatedHashtags);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddHashtag();
    }
  };

  return (
    <S.Wrapper>
      <S.InputAndButtonContainer>
        <S.TempInput
          type="text"
          value={currentHashtag}
          onChange={(e) => setCurrentHashtag(e.target.value)}
          placeholder="해시태그를 입력해주세요."
          onKeyDown={handleOnKeyDown}
        />
        <Button type="button" onClick={handleAddHashtag}>
          추가
        </Button>
      </S.InputAndButtonContainer>
      <S.HashtagAndIconContainer>
        {watchedHashtags.map((hashtag) => (
          <S.HashtagContainer key={hashtag}>
            <S.Hashtags># {hashtag}</S.Hashtags>
            <Icon type="cancel" onClick={() => handleRemoveHashtag(hashtag)} />
          </S.HashtagContainer>
        ))}
      </S.HashtagAndIconContainer>
    </S.Wrapper>
  );
};

export default ContentsHashtag;
