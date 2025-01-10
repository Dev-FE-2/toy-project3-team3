import * as S from './MyInfoEditPage.styles';
import { useRef, useState, useCallback, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  editProfileSchema,
  EditProfileFormValues,
} from '@/schemas/user/editProfileSchema';
import { useCheckDuplicate } from '@/hooks';
import { useEditProfile } from '@/hooks/mutations';
import { useDeactivateAccount } from '@/hooks/mutations';
import { useAuthStateChange } from '@/hooks';
import { Button } from '@/components';
import { DEFAULT_PROFILE_PATH } from '@/constants/user';
import { useEffect } from 'react';

const MyInfoEditPage = () => {
  const { user } = useAuthStateChange();
  const { editProfile, isPending: isEditProfilePending } = useEditProfile();
  const { deactivateAccount, isPending: isDeactivateAccountPending } =
    useDeactivateAccount();

  // 사집 업로드
  const imgRef = useRef<HTMLInputElement>(null);
  const [imgPreview, setImgPreview] = useState<string>(
    user?.profileImg ?? DEFAULT_PROFILE_PATH,
  );

  // 중복 확인 해야하는 필드 valid 여부
  const [validNickname, setValidNickname] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, touchedFields },
    setValue,
    setError,
    clearErrors,
    getValues,
    trigger,
    reset,
    watch, // 디버깅용
  } = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    mode: 'onChange',
    defaultValues: {
      nickname: user?.nickname,
      password: '',
      confirmPassword: '',
      profileImg: user?.profileImg,
    },
  });

  // 초기 유효성 검사
  useEffect(() => {
    trigger();
  }, [trigger]);

  // input 컴포넌트에서 입력 잇는지 검사 용도
  const watchedNickname = watch('nickname');
  const watchedPassword = watch('password');
  const watchedConfirmPassword = watch('confirmPassword');

  // 이미지 변경 반영
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result as string);
        setValue('profileImg', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 닉네임 중복 체크
  const { checkDuplicate: checkNickname } = useCheckDuplicate();

  const checkDuplicateNickname = useCallback(async () => {
    const currNickname = getValues('nickname'); // 중복 확인 버튼 클릭시점에 가져온 값
    if (!currNickname || currNickname === user?.nickname) {
      return setError('nickname', { message: '현재 닉네임과 동일합니다' });
    }

    const result = await checkNickname('nickname', currNickname);

    if (result.data) {
      setError('nickname', {
        message: '이미 사용 중인 닉네임입니다',
      });
      setValidNickname(false);
    } else {
      setValidNickname(true);
    }
  }, [setError, user?.nickname, checkNickname, getValues]);

  // 폼 제출 핸들러
  const onSubmit: SubmitHandler<EditProfileFormValues> = async (formData) => {
    const mergedData = {
      ...user,
      ...formData,
    };

    // 병합된 데이터를 서버로 전송
    await editProfile(mergedData);
  };

  // 변경 사항 유무 추적
  const formData = watch();
  const isFormChanged = useMemo(() => {
    const defaultValues = {
      nickname: user?.nickname,
      password: '',
      confirmPassword: '',
      profileImg: user?.profileImg,
    };

    return (
      formData.nickname !== defaultValues.nickname ||
      (formData.password ?? '') !== defaultValues.password ||
      (formData.confirmPassword ?? '') !== defaultValues.confirmPassword ||
      formData.profileImg !== defaultValues.profileImg
    );
  }, [formData, user]);

  // 변경 사항 되돌리기
  const handleCancel = () => {
    reset({
      nickname: user?.nickname,
      password: '',
      confirmPassword: '',
      profileImg: user?.profileImg,
    });
    if (imgRef.current) imgRef.current.value = '';
    setImgPreview(user?.profileImg ?? '');
  };

  // 계정 해지
  // const handleDeactiveAccount = () => {
  //   toast.dismiss(); // 이미 존재하는 토스트 모두 제거

  //   toast(
  //     <S.ToastDAContainer>
  //       <p>⚠️ 정말 계정을 해지하시겠습니까?</p>
  //       <S.ToastDABtnContainer>
  //         <S.ToastDACancleBtn
  //           type="button"
  //           color="gray"
  //           size="small"
  //           padding="var(--space-xsmall) var(--space-small)"
  //           onClick={() => toast.dismiss()}
  //         >
  //           취소
  //         </S.ToastDACancleBtn>
  //         <S.ToastDAAcceptBtn
  //           type="button"
  //           color="pink"
  //           size="small"
  //           padding="var(--space-xsmall) var(--space-small)"
  //           onClick={async () => {
  //             toast.dismiss();
  //             toast.promise(
  //               deactivateAccount(),
  //               {
  //                 loading: '해지 중...',
  //                 success: '계정이 성공적으로 해지되었습니다.',
  //                 error: '계정 해지 중 오류가 발생했습니다.',
  //               },
  //               {
  //                 id: 'deactivate-process',
  //                 duration: 3000, // success, error 표시
  //                 position: 'top-center',
  //               },
  //             );
  //           }}
  //         >
  //           해지
  //         </S.ToastDAAcceptBtn>
  //       </S.ToastDABtnContainer>
  //     </S.ToastDAContainer>,
  //     {
  //       position: 'top-center',
  //       duration: Infinity,
  //       id: 'deactivate-account', // 토스트 중복 방지를 위한 id
  //       style: {
  //         background: 'var(--color-pale-gray)',
  //       },
  //     },
  //   );
  // };

  // 디버깅용
  console.log('current edit profile form', {
    errors: errors,
    data: watch(),
    validNickname: validNickname,
    isFormChanged,
  });

  return (
    <S.EditProfileFormContainer>
      <S.EditProfileFormTitle>프로필 수정</S.EditProfileFormTitle>
      <S.EditProfileForm onSubmit={handleSubmit(onSubmit)}>
        <S.ProfileImg
          src={imgPreview ?? user?.profileImg}
          alt="profileImg"
          onError={(e) => {
            e.currentTarget.src = DEFAULT_PROFILE_PATH; // 폴백 이미지
          }}
        />
        <S.PictureInput
          type="file"
          id="profileImg"
          {...register('profileImg')}
          ref={imgRef}
          onChange={handleImageChange}
        />
        <S.FormField>
          <Button
            type="button"
            color="gray"
            size="small"
            borderType="round"
            onClick={() => imgRef.current?.click()}
          >
            이미지 변경
          </Button>
        </S.FormField>
        <S.FormField>
          <S.InputwithDuplicateBtn>
            <S.FormInput
              type="text"
              id="nickname"
              label="닉네임"
              {...register('nickname', {
                onChange: () => setValidNickname(false),
              })}
              watchedValue={watchedNickname ?? ''}
              placeholder="닉네임을 입력해주세요"
              errorMessage={
                (touchedFields.nickname &&
                  errors.nickname &&
                  errors.nickname?.message) ||
                ''
              }
              validatedMessage={
                validNickname ? '사용 가능한 닉네임입니다' : undefined
              }
            />
            <Button
              type="button"
              color="primary"
              size="small"
              disabled={!getValues('nickname')}
              onClick={checkDuplicateNickname}
            >
              중복 확인
            </Button>
          </S.InputwithDuplicateBtn>
        </S.FormField>
        <S.FormField>
          <S.FormInput
            type="password"
            id="password"
            label="비밀번호"
            {...register('password', {
              onChange: (e) => {
                const value = e.target.value;
                if (!value) {
                  setValue('password', undefined, { shouldValidate: false });
                  setValue('confirmPassword', undefined, {
                    shouldValidate: false,
                  });
                  clearErrors(['password', 'confirmPassword']);
                } else {
                  trigger(['password', 'confirmPassword']);
                }
              },
            })}
            watchedValue={watchedPassword ?? ''}
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
            watchedValue={watchedConfirmPassword ?? ''}
            errorMessage={
              (touchedFields.confirmPassword &&
                errors.confirmPassword &&
                errors.confirmPassword?.message) ||
              ''
            }
          />
        </S.FormField>

        <S.FormButtonContainer>
          {isFormChanged && (
            <S.CancleButton type="button" color="gray" onClick={handleCancel}>
              변경 되돌리기
            </S.CancleButton>
          )}
          <S.SubmitButton
            color="primary"
            disabled={
              !isFormChanged ||
              isSubmitting ||
              Object.keys(errors).length > 0 ||
              isEditProfilePending
            }
          >
            {isEditProfilePending ? '저장 중...' : '변경 저장'}
          </S.SubmitButton>
        </S.FormButtonContainer>

        <S.DeactivateAccountButton
          type="button"
          color="gray"
          size="small"
          borderType="round"
          onClick={() => {
            deactivateAccount();
            alert('회원 탈퇴 합니다');
          }}
        >
          {isDeactivateAccountPending ? '퇼퇴 중...' : '회원 탈퇴'}
        </S.DeactivateAccountButton>
      </S.EditProfileForm>
    </S.EditProfileFormContainer>
  );
};

export default MyInfoEditPage;
