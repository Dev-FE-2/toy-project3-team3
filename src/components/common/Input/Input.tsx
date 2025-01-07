import * as S from './Input.styles';
import { useState } from 'react';
import { InputProps } from '@/types/common';

const Input = (props: InputProps) => {
  const { type, register, errorMessage, label, placeholder, ...rest } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFilled(e.target.value.length > 0);
  };

  const commonProps = {
    ...register,
    $errorMessage: !!errorMessage,
    placeholder: '',
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    autoComplete: 'off',
    ...rest,
  };

  console.log(isFilled, isFocused);

  return (
    <>
      {type === 'textarea' ? (
        <S.StyledTextarea {...commonProps} />
      ) : (
        <S.InputWrapper>
          <S.StyledInput type={type} onChange={handleChange} {...commonProps} />
          <S.ErrorMessage>{errorMessage}</S.ErrorMessage>
          <S.FloatingLabel
            $isActive={isFocused || isFilled}
            $errorMessage={!!errorMessage}
          >
            {isFocused || isFilled ? label : placeholder}
          </S.FloatingLabel>
        </S.InputWrapper>
      )}
    </>
  );
};

export default Input;

/**
 * 사용 예시
 * <Input
      type={'textarea'}
      id={'comment'}
      {...register('comment')}
      placeholder={'댓글 작성하기'}
      label={'댓글'}
    />

    <Input
      type={'text'}
      id={'playlist_title'}
      errorMessage={touchedFields.playlistTitle && errors.playlistTitle && errors.playlistTitle.message}
      {...register('playlistTitle')}
      placeholder={'플레이리스트 제목을 입력해주세요'}
      label={'제목'}
    />
 */
