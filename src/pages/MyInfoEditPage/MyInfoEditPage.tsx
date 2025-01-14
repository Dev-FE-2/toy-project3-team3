import * as S from './MyInfoEditPage.styles';
import { useRef, useState, useCallback, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import {
  editProfileSchema,
  EditProfileFormValues,
} from '@/schemas/user/editProfileSchema';
import {
  useEditProfile,
  useDeactivateAccount,
  useAuth,
  useCheckDuplicate,
  useSignOut,
} from '@/hooks';
import { Backward, Button, Confirm } from '@/components';
import { DEFAULT_PROFILE_PATH } from '@/constants';

const MyInfoEditPage = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  const { user } = useAuth();
  const { deactivateAccount, isPending: isDeactivateAccountPending } =
    useDeactivateAccount();

  const { signOut, isPending: signoutPending } = useSignOut(); // 임시 로그아웃

  // 사집 업로드
  const imgRef = useRef<HTMLInputElement>(null);
  const [imgPreview, setImgPreview] = useState<string>(
    user?.profileImage ?? DEFAULT_PROFILE_PATH,
  );

  // 중복 확인 해야하는 필드 valid 여부
  const [validNickname, setValidNickname] = useState<boolean>(false);

  const defaultValues = useMemo(
    () => ({
      nickname: user?.nickname,
      password: '',
      confirmPassword: '',
      profileImage: user?.profileImage,
      shortIntro: user?.shortIntro,
    }),
    [user],
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, touchedFields },
    setValue,
    setError,
    trigger,
    clearErrors,
    getValues,
    reset,
    watch, // 디버깅용
  } = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    mode: 'onChange',
    defaultValues,
  });
  // input 컴포넌트에서 입력 잇는지 검사 용도
  const watchedNickname = watch('nickname');
  const watchedShortIntro = watch('shortIntro');
  const watchedPassword = watch('password');
  const watchedConfirmPassword = watch('confirmPassword');

  const { editProfile, isPending: isEditProfilePending } =
    useEditProfile(setError);

  // 이미지 변경 반영
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result as string);
        setValue('profileImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 닉네임 중복 체크
  const { checkDuplicate: checkNickname, isPending: isCheckNicknamePending } =
    useCheckDuplicate();

  const checkDuplicateNickname = useCallback(async () => {
    const currNickname = getValues('nickname'); // 중복 확인 버튼 클릭시점에 가져온 값
    if (!currNickname) return;

    const isDuplicate = await checkNickname({
      field: 'nickname',
      value: currNickname ?? '',
    });

    if (isDuplicate) {
      setError('nickname', {
        message: '이미 사용 중인 닉네임입니다',
      });
      setValidNickname(false);
    } else {
      setValidNickname(true);
    }
  }, [setError, checkNickname, getValues]);

  // 폼 제출 핸들러
  const onSubmit: SubmitHandler<EditProfileFormValues> = async (formData) => {
    await editProfile(formData);
  };

  const onError: SubmitErrorHandler<EditProfileFormValues> = (errors) => {
    console.log('Form Errors:', errors);
  };

  // 변경 사항 유무 추적
  const formData = watch();
  const isFormChanged = useMemo(() => {
    return (
      Object.keys(defaultValues) as Array<keyof typeof defaultValues>
    ).some((key) => formData[key] !== defaultValues[key]);
  }, [formData, defaultValues]);
  const isNicknameChanged = useMemo(() => {
    return formData.nickname !== user?.nickname;
  }, [formData.nickname, user?.nickname]);

  // 변경 사항 되돌리기
  const handleCancel = () => {
    reset({
      nickname: user?.nickname,
      password: '',
      confirmPassword: '',
      profileImage: user?.profileImage,
      shortIntro: user?.shortIntro,
    });
    if (imgRef.current) imgRef.current.value = '';
    setImgPreview(user?.profileImage ?? '');
  };

  // 회원 탈퇴 confirm 버튼
  const handleConfirmLeftBtn = async () => {
    await deactivateAccount();
  };

  // 디버깅용
  // console.log('current edit profile form', {
  //   errors: errors,
  //   data: watch(),
  //   validNickname: validNickname,
  //   isFormChanged,
  // });

  return (
    <S.EditProfileFormContainer>
      <Backward />
      <S.EditProfileForm onSubmit={handleSubmit(onSubmit, onError)}>
        <S.ProfileImg
          src={imgPreview ?? user?.profileImage}
          alt="profileImg"
          onError={(e) => {
            e.currentTarget.src = DEFAULT_PROFILE_PATH; // 폴백 이미지
          }}
        />
        <S.PictureInput
          type="file"
          id="profileImg"
          {...register('profileImage')}
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
                (touchedFields.nickname && errors.nickname?.message) || ''
              }
              validatedMessage={
                !errors.nickname && validNickname
                  ? '사용 가능한 닉네임입니다'
                  : undefined
              }
            />
            <S.DuplicateCheckBtn
              type="button"
              color="primary"
              size="small"
              disabled={!getValues('nickname')}
              onClick={checkDuplicateNickname}
            >
              {isCheckNicknamePending ? '확인 중... ' : '중복 확인'}
            </S.DuplicateCheckBtn>
          </S.InputwithDuplicateBtn>
        </S.FormField>
        <S.FormField>
          <S.FormInput
            type="text"
            id="shortIntro"
            label="한줄 소개"
            {...register('shortIntro')}
            watchedValue={watchedShortIntro ?? ''}
            placeholder="한줄소개를 입력해주세요"
            errorMessage={
              (touchedFields.shortIntro && errors.shortIntro?.message) || ''
            }
          />
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
              (touchedFields.password && errors.password?.message) || ''
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
              (errors.confirmPassword && errors.confirmPassword?.message) || ''
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
              (isNicknameChanged && !validNickname) ||
              isSubmitting ||
              Object.keys(errors).length > 0 ||
              isEditProfilePending
            }
          >
            {isEditProfilePending ? '저장 중...' : '변경 저장'}
          </S.SubmitButton>
        </S.FormButtonContainer>

        <Button
          type="button"
          color="gray"
          size="small"
          onClick={() => signOut()}
          disabled={signoutPending}
        >
          {signoutPending ? '로그아웃 중...' : '임시 로그아웃'}
        </Button>

        <S.DeactivateAccountButton
          type="button"
          color="gray"
          size="small"
          borderType="round"
          onClick={() => setShowConfirm(true)}
        >
          {isDeactivateAccountPending ? '탈퇴 중...' : '회원 탈퇴'}
        </S.DeactivateAccountButton>
        {showConfirm && (
          <Confirm
            content={{
              text: '회원 탈퇴 하시겠습니까?',
              leftBtn: '예',
              rightBtn: '아니오',
            }}
            onClickLeftBtn={handleConfirmLeftBtn}
            onClickRightBtn={() => setShowConfirm(false)}
          />
        )}
      </S.EditProfileForm>
    </S.EditProfileFormContainer>
  );
};

export default MyInfoEditPage;
