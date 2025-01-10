import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/apis';
import { EditProfileFormValues } from '@/schemas/user/editProfileSchema';
import { EditProfileRequestValues } from '@/types';
import { useErrorHandler } from '@/hooks';

const useEditProfile = () => {
  const handleError = useErrorHandler();

  const { mutateAsync: editProfile, isPending } = useMutation<
    void,
    Error,
    EditProfileFormValues
  >({
    mutationFn: async ({
      nickname,
      password,
      profileImg,
    }: EditProfileFormValues) => {
      const updateData: EditProfileRequestValues = {
        data: {
          nickname,
          profile_image: profileImg,
        },
      };

      // password를 바꿀 때만 요청에 추가
      if (password) updateData.password = password;

      // Supabase 프로필 수정
      const { error } = await supabase.auth.updateUser(updateData);

      if (error) throw error;
    },
    onError: (error) => handleError('프로필 수정', error),
  });

  return { editProfile, isPending };
};

export default useEditProfile;
