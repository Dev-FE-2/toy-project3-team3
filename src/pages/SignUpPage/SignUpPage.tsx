import * as S from './SignUpPage.styles';
import { useState, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signUpSchema, SignUpFormValues } from '@/schemas/user/signUpSchema';
import { useCheckDuplicate } from '@/hooks';
import { useSignUp } from '@/hooks/mutations';

const SignUpPage = () => {
  // 중복 확인 해야하는 필드 valid 여부
  const [validFields, setValidFields] = useState<{
    nickname?: boolean;
    email?: boolean;
  }>({});
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, touchedFields },
    setError,
    getValues,
    watch, // 디버깅용
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // input 컴포넌트에서 입력 잇는지 검사 용도
  const watchedNickname = watch('nickname');
  const watchedEmail = watch('email');
  const watchedPassword = watch('password');
  const watchedConfirmPassword = watch('confirmPassword');

  const { signUp, isPending } = useSignUp(
    (field: keyof SignUpFormValues, message: string) => {
      setError(field, { message });
      setValidFields((prev) => ({ ...prev, [field]: false }));
    },
  );

  // 닉네임, 이메일 중복 체크
  const { checkDuplicate } = useCheckDuplicate();

  const checkDuplicateNicknameOrEmail = useCallback(
    async (field: 'nickname' | 'email') => {
      const value = getValues(field);
      if (!value) return;
      const result = await checkDuplicate(field, value);

      console.log(result);

      if (result.data) {
        console.log('supabase 검색 결과', result.data);
        setError(field, {
          message:
            field === 'nickname'
              ? '이미 사용 중인 닉네임입니다'
              : '이미 가입된 이메일입니다',
        });
        setValidFields((prev) => ({ ...prev, [field]: !result.data }));
      }
    },
    [setError, checkDuplicate, getValues],
  );

  // 폼 제출 핸들러
  const onSubmit: SubmitHandler<SignUpFormValues> = async (formData) => {
    await signUp(formData);
  };

  // 디버깅용
  // console.log('current sign up form', {
  //   errors: errors,
  //   data: watch(),
  // });

  return (
    <S.SignUpPageContainer>
      <S.Logo />
      <S.SignUpForm onSubmit={handleSubmit(onSubmit)}>
        <S.FormField>
          <S.InputwithDuplicateBtn>
            <S.FormInput
              type="text"
              id="nickname"
              label="닉네임"
              {...register('nickname', {
                onChange: () =>
                  setValidFields((prev) => ({ ...prev, nickname: false })),
              })}
              watchedValue={watchedNickname}
              placeholder="닉네임을 입력해주세요"
              errorMessage={
                (touchedFields.nickname && errors.nickname?.message) || ''
              }
              validatedMessage={
                validFields.nickname ? '사용 가능한 닉네임입니다' : undefined
              }
            />
            <S.DuplicateCheckBtn
              type="button"
              color="primary"
              size="small"
              disabled={!getValues('nickname')}
              onClick={() => checkDuplicateNicknameOrEmail('nickname')}
            >
              중복 확인
            </S.DuplicateCheckBtn>
          </S.InputwithDuplicateBtn>
        </S.FormField>
        <S.FormField>
          <S.InputwithDuplicateBtn>
            <S.FormInputw
              type="email"
              id="email"
              label="이메일"
              {...register('email', {
                onChange: () =>
                  setValidFields((prev) => ({ ...prev, email: false })),
              })}
              watchedValue={watchedEmail}
              placeholder="이메일 (example@email.com)"
              errorMessage={
                (touchedFields.email && errors.email?.message) || ''
              }
              validatedMessage={
                validFields.email ? '사용 가능한 이메일입니다.' : ''
              }
            />
            <S.DuplicateCheckBtn
              type="button"
              color="primary"
              size="small"
              disabled={!getValues('email')}
              onClick={() => checkDuplicateNicknameOrEmail('email')}
            >
              중복 확인
            </S.DuplicateCheckBtn>
          </S.InputwithDuplicateBtn>
        </S.FormField>
        <S.FormField>
          <S.FormInput
            type="password"
            id="password"
            label="비밀번호"
            {...register('password')}
            watchedValue={watchedPassword}
            placeholder="비밀번호를 입력해주세요 (6자 이상)"
            errorMessage={
              (touchedFields.password &&
                errors.password &&
                errors.password?.message) ||
              ''
            }
          />
        </S.FormField>
        <S.FormField>
          <S.FormInput
            type="password"
            id="confirmPassword"
            label="비밀번호 확인"
            {...register('confirmPassword')}
            placeholder="비밀번호를 다시 입력해주세요"
            watchedValue={watchedConfirmPassword}
            errorMessage={
              (touchedFields.confirmPassword &&
                errors.confirmPassword &&
                errors.confirmPassword?.message) ||
              ''
            }
          />
        </S.FormField>

        <S.SubmitButton
          color="primary"
          disabled={
            isSubmitting ||
            Object.keys(errors).length > 0 ||
            isPending ||
            !validFields.nickname ||
            !validFields.email
          }
        >
          {isPending ? '가입 중...' : '가입하기'}
        </S.SubmitButton>
        <S.ToOtherPageText href="/sign-in">
          회원가입이 되어 있으신가요?
        </S.ToOtherPageText>
      </S.SignUpForm>
    </S.SignUpPageContainer>
  );
};

export default SignUpPage;
