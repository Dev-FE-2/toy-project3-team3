import { useState } from 'react';
import * as S from './ContentsHashtag.styles';
import { Button, Icon, Input } from '@/components/common';
import { useAtom } from 'jotai';
import { hashtagAtom } from '@/atoms';

const ContentsHashtag = () => {
  const [hashtags, setHashtags] = useAtom(hashtagAtom);
  const [currentHashtag, setCurrentHashtag] = useState('');
  const [error, setError] = useState('');

  const handleAddHashtag = () => {
    const trimmedInput = currentHashtag.trim();

    if (trimmedInput && !hashtags.includes(trimmedInput)) {
      if (hashtags.length < 10) {
        const updatedHashtags = [...hashtags, trimmedInput];
        setHashtags(updatedHashtags);
        setCurrentHashtag('');
        setError('');
      } else {
        setError('해시태그는 10개까지만 추가 가능합니다.');
      }
    } else {
      setError('이미 존재하는 해시태그입니다.');
    }
  };

  const handleRemoveHashtag = (hashtag: string) => {
    const removedHashtags = hashtags.filter((tag) => tag !== hashtag);
    setHashtags(removedHashtags);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    if (e.nativeEvent.isComposing) return;

    e.preventDefault();
    e.stopPropagation();
    handleAddHashtag();
  };

  return (
    <S.Wrapper>
      <S.InputAndButtonContainer>
        <Input
          type="text"
          id="hashtag"
          label="해시태그"
          value={currentHashtag}
          onChange={(e) => setCurrentHashtag(e.target.value)}
          placeholder="해시태그를 입력해주세요."
          onKeyDown={handleOnKeyDown}
        />
        <S.ButtonContainer>
          <Button type="button" onClick={handleAddHashtag}>
            추가
          </Button>
        </S.ButtonContainer>
      </S.InputAndButtonContainer>
      <S.Error>{error}</S.Error>
      <S.HashtagAndIconContainer>
        {hashtags.map((hashtag) => (
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
