//useUser로 옮겨야 함
import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { supabase } from '@/apis';
import { EditProfileFormValues } from '@/schemas/user/editProfileSchema';
import { EditProfileRequestValues } from '@/types';
import { useErrorHandler } from '@/hooks';
// import { alert } from '@/components';
import { isApiError } from '@/utils/isApiError';

const useEditProfile = (setError: UseFormSetError<EditProfileFormValues>) => {
  const handleError = useErrorHandler();

  const { mutateAsync: editProfile, isPending } = useMutation<
    void,
    Error,
    EditProfileFormValues
  >({
    mutationFn: async ({
      nickname,
      password,
      profileImage,
    }: EditProfileFormValues) => {
      const updateData: EditProfileRequestValues = {
        data: {},
      };

      // 데이터를 바꿀 때만 요청에 추가
      if (nickname) updateData.data.nickname = nickname;
      if (profileImage) updateData.data.profile_image = profileImage;
      if (password) updateData.password = password;

      // Supabase 프로필 수정
      const { error } = await supabase.auth.updateUser(updateData);

      if (error) throw error;
    },
    onSuccess: () => {
      // alert.success('프로필 수정이 완료되었어요');
    },
    onError: (error) => {
      if (isApiError(error) && error.status === 422) {
        // 폼에 에러 메시지 표시
        setError('password', {
          message: '',
        });
        setError('confirmPassword', {
          message: '이전 비밀번호와 다른 비밀번호를 입력해주세요',
        });
        return;
      }
      handleError('프로필 수정', error);
      // alert.error('프로필 수정 중 오류가 발생했어요');
    },
  });

  return { editProfile, isPending };
};

export default useEditProfile;
