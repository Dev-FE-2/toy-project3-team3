//useUser로 옮겨야 함
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { UseFormSetError } from 'react-hook-form';
import { ROUTES } from '@/constants';
import { supabase } from '@/apis';
import { EditProfileFormValues } from '@/schemas/user/editProfileSchema';
import { EditProfileRequestValues } from '@/types';
import { useErrorHandler } from '@/hooks';
import { isApiError } from '@/utils/isApiError';
import { useAlert } from '@/hooks';

const useEditProfile = (setError: UseFormSetError<EditProfileFormValues>) => {
  const handleError = useErrorHandler();
  const navigate = useNavigate();
  const { HOME } = ROUTES;
  const alert = useAlert();

  const { mutateAsync: editProfile, isPending } = useMutation<
    void,
    Error,
    EditProfileFormValues
  >({
    mutationFn: async ({
      nickname,
      password,
      profileImage,
      shortIntro,
    }: EditProfileFormValues) => {
      const updateData: EditProfileRequestValues = {
        data: {},
      };

      // 데이터를 바꿀 때만 요청에 추가
      if (nickname) updateData.data.nickname = nickname;
      if (profileImage) updateData.data.profile_image = profileImage;
      if (shortIntro) updateData.data.short_intro = shortIntro;
      if (password) updateData.password = password;

      console.log('updateData', updateData);

      // Supabase 프로필 수정
      const { error, data } = await supabase.auth.updateUser(updateData);
      if (error) {
        console.error('Supabase updateUser error:', error);
        throw error;
      }
      console.log('Supabase updateUser result:', data);
    },
    onSuccess: () => {
      alert.success('프로필 수정이 완료되었어요');
      navigate(HOME);
    },
    onError: (error) => {
      if (isApiError(error) && error.status === 422) {
        // 폼에 에러 메시지 표시
        setError('password', {
          message: '이전 비밀번호와 다른 비밀번호를 입력해주세요',
        });
        setError('confirmPassword', {
          message: '.',
        });
        return;
      }
      handleError('프로필 수정', error);
      alert.error('프로필 수정 중 오류가 발생했어요');
    },
  });

  return { editProfile, isPending };
};

export default useEditProfile;
