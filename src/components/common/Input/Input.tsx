import * as S from './Input.styles';
import { FocusEvent } from 'react';
import {
  useState,
  forwardRef,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import { InputProps } from '@/types';

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>((props, ref) => {
  // TextInput일 때만 사용되는 상태
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setIsFocused(false);
    if (e.target instanceof HTMLInputElement) {
      props.onBlur?.(e as FocusEvent<HTMLInputElement>); // Input일 때
    } else if (e.target instanceof HTMLTextAreaElement) {
      props.onBlur?.(e as FocusEvent<HTMLTextAreaElement>); // TextArea일 때
    }
  };

  const { type } = props;
  // TextArea
  if (type === 'textarea') {
    const { id, errorMessage, placeholder, ...rest } = props;
    const textareaProps = {
      id,
      $errorMessage: !!errorMessage,
      placeholder,
      autoComplete: 'off',
      spellCheck: 'false',
      'aria-invalid': !!errorMessage,
      'aria-describedby': errorMessage ? `${id}-error` : undefined,
      ...rest,
    };

    return (
      <S.InputWrapper>
        <S.StyledTextarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          {...(textareaProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
        <S.TextAreaErrorMessage
          id={`${id}-error`}
          role="alert"
          aria-live="polite"
          $errorMessage={!!errorMessage}
        >
          {errorMessage}
        </S.TextAreaErrorMessage>
      </S.InputWrapper>
    );
  }

  // TextInput
  const {
    id,
    label,
    placeholder,
    errorMessage,
    watchedValue,
    validatedMessage,
    ...rest
  } = props;
  const textInputProps = {
    id,
    $errorMessage: !!errorMessage,
    $validatedMessage: validatedMessage,
    placeholder: '',
    autoComplete: 'off',
    'aria-invalid': !!errorMessage,
    'aria-describedby': errorMessage ? `${id}-error` : undefined,
    ...rest,
  };

  return (
    <S.InputWrapper>
      <S.StyledTextInput
        ref={ref as React.Ref<HTMLInputElement>}
        {...(textInputProps as InputHTMLAttributes<HTMLInputElement>)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {errorMessage ? (
        <S.BaseMessage
          id={`${id}-error`}
          role="alert"
          aria-live="polite"
          $errorMessage={!!errorMessage}
        >
          {errorMessage}
        </S.BaseMessage>
      ) : null}
      {validatedMessage ? (
        <S.BaseMessage
          id={`${id}-varified`}
          role="alert"
          aria-live="polite"
          $validatedMessage={validatedMessage}
        >
          {validatedMessage}
        </S.BaseMessage>
      ) : null}
      <S.FloatingLabel
        htmlFor={id}
        $isActive={isFocused || !!watchedValue}
        $errorMessage={!!errorMessage}
      >
        {isFocused || !!watchedValue ? label : placeholder}
      </S.FloatingLabel>
    </S.InputWrapper>
  );
});

export default Input;

/**
 * 사용 예시
 *  <Input
      type={'textarea'}
      id={'comment'}
      {...register('comment')}
      placeholder={'댓글 작성하기'}
      errorMessage={'에러발생'}
    />

    <Input
      type="email"
      id="email"
      label="이메일"
      {...register('email')}
      watchedValue={watchedEmail} // 입력 값 감시 - const watchedEmail = watch('email');
      placeholder="이메일 (example@email.com)"
      errorMessage={
        (touchedFields.email &&
          errors.email &&
          errors.email?.message) ||
        ''
      }
      validatedMessage={
        watchedEmail && !errors.email ? '사용 가능한 이메일입니다.' : ''
      }
    />
 */
