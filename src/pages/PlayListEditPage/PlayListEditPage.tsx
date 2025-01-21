import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as S from './PlayListEditPage.styles';
import {
  Backward,
  EditContents,
  EditPlayList,
  EditThumbnail,
} from '@/components';
import { playListEditSchema } from '@/schemas/play-list-edit/playListEditSchema';
import type { PlayListEditFormValues } from '@/types';

import { useHandleCreatePlaylist } from '@/hooks/play-list/useHandleCreatePlaylist';
import { useAuth, useHandleUpdatePlaylist } from '@/hooks';
import { useFetchCategoryByCategoryNameEn } from '@/hooks/useCategory';
import { editModeAtom, playListAtom, playlistErrorAtom } from '@/atoms';
import { useAtom, useSetAtom } from 'jotai';
import { useInitialPlaylistData } from '@/hooks/play-list/useInitialPlaylistData';

const PlaylistEditPage = () => {
  const [playlists] = useAtom(playListAtom);
  const setPlaylistError = useSetAtom(playlistErrorAtom);
  const [editMode] = useAtom(editModeAtom);
  const { user } = useAuth();
  const methods = useForm<PlayListEditFormValues>({
    resolver: zodResolver(playListEditSchema),
    defaultValues: {
      title: '',
      description: '',
      category: 'notSelected',
    },
  });

  const { isLoading } = useInitialPlaylistData(methods.setValue);

  const watchedCategory = methods.watch('category');
  const { handleCreatePlaylist, isSubmitting: isCreateSubmitting } =
    useHandleCreatePlaylist(user?.userId || '');
  const { handleUpdatePlaylist, isSubmitting: isUpdateSubmitting } =
    useHandleUpdatePlaylist(user?.userId || '');
  const isSubmitting = isCreateSubmitting || isUpdateSubmitting;
  const { data: originCategoryData } =
    useFetchCategoryByCategoryNameEn(watchedCategory);

  const handleOnSubmit = async (data: PlayListEditFormValues) => {
    if (playlists.length === 0) {
      setPlaylistError('영상을 추가해주세요.');
      return;
    }

    if (originCategoryData && originCategoryData.length > 0) {
      data.category = originCategoryData[0].category_id;
    }

    try {
      if (editMode === 'add') {
        await handleCreatePlaylist(data);
      }

      if (editMode === 'modify') {
        await handleUpdatePlaylist(data);
      }
    } catch (error) {
      console.error('플레이리스트 생성 실패: ', error);
    }
  };

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <FormProvider {...methods}>
      <S.PlayListEditPageWrapper>
        <Backward />
        <S.Form onSubmit={methods.handleSubmit(handleOnSubmit)}>
          <EditThumbnail />
          <EditContents />
          <EditPlayList />
          <S.SubmitButton disabled={isSubmitting} type="submit">
            저장
          </S.SubmitButton>
        </S.Form>
      </S.PlayListEditPageWrapper>
    </FormProvider>
  );
};

export default PlaylistEditPage;
