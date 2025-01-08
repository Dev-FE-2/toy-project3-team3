import { useState } from 'react';
import { useAtom } from 'jotai';
import * as S from './ContentsHashtag.styles';
import { Button, Icon } from '@/components/common';
import { hashtagAtom } from '@/atoms';

const ContentsHashtag = () => {
  const [currentInput, setCurrentInput] = useState('');
  const [hashtags, setHashtags] = useAtom(hashtagAtom);

  const handleAddHashtag = () => {
    if (!currentInput.trim()) return;

    setHashtags([...hashtags, currentInput]);
    setCurrentInput('');
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent) => {
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
          value={currentInput}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
        />
        <Button>추가</Button>
      </S.InputAndButtonContainer>
      <S.HashtagAndIconContainer>
        {hashtags.map((hashtag, index) => (
          <S.HashtagContainer>
            <S.Hashtags key={index}># {hashtag}</S.Hashtags>
            <Icon type="cancel" />
          </S.HashtagContainer>
        ))}
      </S.HashtagAndIconContainer>
    </S.Wrapper>
  );
};

export default ContentsHashtag;
