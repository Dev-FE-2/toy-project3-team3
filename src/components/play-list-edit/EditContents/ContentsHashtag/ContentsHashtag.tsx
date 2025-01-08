import { useState } from 'react';
import { useAtom } from 'jotai';
import * as S from './ContentsHashtag.styles';
import { Button, Icon } from '@/components/common';
import { hashtagAtom } from '@/atoms';

const ContentsHashtag = () => {
  const [currentInput, setCurrentInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [hashtags, setHashtags] = useAtom(hashtagAtom);

  const handleAddHashtag = () => {
    const trimmedInput = currentInput.trim();
    console.log('trimmedInput:', trimmedInput);
    console.log('hashtags before update:', hashtags);

    if (trimmedInput && !hashtags.includes(trimmedInput)) {
      if (hashtags.length < 10) {
        setHashtags((prevHashtags) => {
          const newHashtags = [...prevHashtags, trimmedInput];
          console.log('newHashtags:', newHashtags);
          return newHashtags;
        });
        setCurrentInput('');
      } else {
        // 📌 10개까지만 추가 가능하다는 에러 메시지 추가
      }
    } else if (hashtags.includes(trimmedInput)) {
      // 📌 이미 존재한다는 에러 메시지 추가
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing) {
      e.preventDefault();
      handleAddHashtag();
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  return (
    <S.Wrapper>
      <S.InputAndButtonContainer>
        <S.TempInput
          type="text"
          value={currentInput}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
        />
        <Button onClick={handleAddHashtag}>추가</Button>
      </S.InputAndButtonContainer>
      <S.HashtagAndIconContainer>
        {hashtags.map((hashtag, index) => (
          <S.HashtagContainer key={index}>
            <S.Hashtags># {hashtag}</S.Hashtags>
            <Icon type="cancel" />
          </S.HashtagContainer>
        ))}
      </S.HashtagAndIconContainer>
    </S.Wrapper>
  );
};

export default ContentsHashtag;
