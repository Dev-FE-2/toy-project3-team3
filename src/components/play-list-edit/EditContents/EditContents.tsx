import * as S from './EditContents.styles';
import { Select } from '@/components/common';
import { useFormContext } from 'react-hook-form';
import ContentsHashtag from '@/components/play-list-edit/EditContents/ContentsHashtag/ContentsHashtag';
import type { PlayListEditFormValues } from '@/types';

const EditContents = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<PlayListEditFormValues>();
  const watchedTitle = watch('title');
  const watchedDescription = watch('description');

  return (
    <S.ContentsForm>
      <S.FormInput
        type="text"
        id="title"
        label="제목"
        {...register('title')}
        placeholder="제목을 입력해주세요."
        watchedValue={watchedTitle}
        errorMessage={errors.title?.message}
      />
      <S.FormInput
        type="text"
        id="description"
        label="소개"
        {...register('description')}
        placeholder="플레이리스트를 소개해주세요."
        watchedValue={watchedDescription}
        errorMessage={errors.description?.message}
      />
      <Select
        type="categoryEdit"
        {...register('category')}
        errorMessage={errors.category?.message}
      />
      <ContentsHashtag />
    </S.ContentsForm>
  );
};

export default EditContents;
