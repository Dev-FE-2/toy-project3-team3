import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as S from './PlaylistEditPage.styles';
import { Backward, EditContents, EditPlayList } from '@/components';
import { playListEditSchema } from '@/schemas/play-list-edit/playListEditSchema';
import type { CategoryType, PlayListEditFormValues } from '@/types';

const PlaylistEditPage = () => {
  const methods = useForm<PlayListEditFormValues>({
    resolver: zodResolver(playListEditSchema),
    defaultValues: {
      title: '',
      description: '',
      category: 'notSelected',
    },
  });

  const handleOnSubmit = (data: {
    title: string;
    description: string;
    category: CategoryType;
  }) => {
    console.log(data);

    // DB 저장함수 추가 필요
    // 비동기 함수로 변경 필요
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
