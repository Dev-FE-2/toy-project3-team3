import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as S from './PlaylistEditPage.styles';
import { Backward, EditContents, EditPlayList } from '@/components';
import { playListEditSchema } from '@/schemas/play-list-edit/playListEditSchema';
import type { PlayListEditFormValues } from '@/types';

import { useHandleCreatePlaylist } from '@/hooks/play-list/useHandleCreatePlaylist';
import { useAuthStateChange } from '@/hooks';
import { useFetchCategoryByCategoryNameEn } from '@/hooks/useCategory';

const PlaylistEditPage = () => {
  const { user } = useAuthStateChange();
  console.log(user);
  const methods = useForm<PlayListEditFormValues>({
    resolver: zodResolver(playListEditSchema),
    defaultValues: {
      title: '',
      description: '',
      category: 'notSelected',
    },
  });
  const watchedCategory = methods.watch('category');
  const { handleCreatePlaylist } = useHandleCreatePlaylist(user!.userId);
  const { data: categoryData } =
    useFetchCategoryByCategoryNameEn(watchedCategory);

  const handleOnSubmit = async (data: PlayListEditFormValues) => {
    try {
      if (categoryData && categoryData.length > 0) {
        data.category = categoryData[0].category_id;
      }

      await handleCreatePlaylist(data);
    } catch (error) {
      console.error('플레이리스트 생성 실패: ', error);
    }
  };

  return (
    <FormProvider {...methods}>
      <S.PlayListEditPageWrapper>
        <Backward />
        <form onSubmit={methods.handleSubmit(handleOnSubmit)}>
          <EditContents />
          <EditPlayList />
          <S.SubmitButton type="submit">저장</S.SubmitButton>
        </form>
      </S.PlayListEditPageWrapper>
    </FormProvider>
  );
};

export default PlaylistEditPage;
