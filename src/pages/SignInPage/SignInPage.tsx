import * as S from './SignInPage.styles';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signInSchema, SignInFormValues } from '@/schemas/user/signInSchema';
import { useSignIn, useGoogleSignIn, useSignOut } from '@/hooks/mutations';
import { useEffect } from 'react';
import { Button } from '@/components';
// import { GRAM_LOGO } from '@/constants';

const SignInPage = () => {
  const { signOut, isPending: signoutPending } = useSignOut(); // 임시 로그아웃
  const {
    register,
    handleSubmit,
    trigger,
    formState: { isSubmitting, errors, touchedFields },
    setError,
    watch, // 디버깅용
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 초기 유효성 검사
  useEffect(() => {
    trigger();
  }, [trigger]);

  const watchedEmail = watch('email');
  const watchedPassword = watch('password');

  const { signIn, isPending: isSignInPending } = useSignIn(setError);
  const { googleSignIn, isPending: isGoogleSignInPending } = useGoogleSignIn();

  // 폼 제출 핸들러
  const onSubmit: SubmitHandler<SignInFormValues> = async (formData) => {
    await signIn(formData);
  };

  // 소셜 로그인
  const handleGoogleSignIn = async () => {
    await googleSignIn();
  };

  // 디버깅용
  console.log('current sign in form', {
    errors,
    data: watch(),
  });

  return (
    <S.SignInFormContainer>
      <S.SignInFormTitle>로그인</S.SignInFormTitle>
      <S.SignInForm onSubmit={handleSubmit(onSubmit)}>
        <S.FormField>
          <S.FormInput
            type="email"
            id="email"
            label="이메일"
            {...register('email')}
            placeholder="이메일 (example@email.com)"
            watchedValue={watchedEmail}
            errorMessage={
              (touchedFields.email && errors.email && errors.email?.message) ||
              ''
            }
          />
        </S.FormField>
        <S.FormField>
          <S.FormInput
            type="password"
            id="password"
            label="비밀번호"
            {...register('password')}
            placeholder="비밀번호를 입력해주세요 (6자 이상)"
            watchedValue={watchedPassword}
            errorMessage={
              (touchedFields.password &&
                errors.password &&
                errors.password?.message) ||
              ''
            }
          />
        </S.FormField>

        <S.SubmitButton
          color="primary"
          disabled={
            isSubmitting || Object.keys(errors).length > 0 || isSignInPending
          }
        >
          {isSignInPending ? '로그인 중...' : '로그인'}
        </S.SubmitButton>
        <S.GoogleSignInBtn
          type="button"
          size="small"
          onClick={() => handleGoogleSignIn()}
        >
          <S.GoogleBtnTextWrapper>
            <S.GoogleIcon />
            <p>
              {isGoogleSignInPending
                ? '로그인 중...'
                : 'Google 계정으로 로그인'}
            </p>
          </S.GoogleBtnTextWrapper>
        </S.GoogleSignInBtn>
        <S.ToOtherPageText href="/sign-up">
          회원가입이 되어 있지 않으신가요?
        </S.ToOtherPageText>
        <Button
          type="button"
          color="gray"
          size="small"
          onClick={() => signOut()}
          disabled={signoutPending}
        >
          {signoutPending ? '로그아웃 중...' : '임시 로그아웃'}
        </Button>
      </S.SignInForm>
    </S.SignInFormContainer>
  );
};

export default SignInPage;
