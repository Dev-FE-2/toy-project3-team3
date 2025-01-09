import { useState } from 'react';
import * as S from './EditContents.styles';
import { Select } from '@/components/common';
import type { CategoryType, PlayListEditFormValues } from '@/types';
import { useForm } from 'react-hook-form';
import ContentsHashtag from '@/components/play-list-edit/EditContents/ContentsHashtag/ContentsHashtag';
import { zodResolver } from '@hookform/resolvers/zod';
import { playListEditSchema } from '@/schemas/play-list-edit/playListEditSchema';

const EditContents = () => {
  const [category, setCategory] = useState<CategoryType>('all');
  // const [hashtags, setHashtags] = useState<string[]>([]);
  // const [currentHashtag, setCurrentHashtag] = useState<string>('');

  const {
    register,
    handleSubmit,
    // trigger,
    formState: { /*isSubmitting,*/ errors, touchedFields },
    // getValues,
    watch,
  } = useForm({
    resolver: zodResolver(playListEditSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const watchedTitle = watch('title');
  const watchedDescription = watch('description');

  const onSubmit = async (data: PlayListEditFormValues) => {
    // await saveData(data)
    console.log(data);
  };

  console.log('현재 입력 중인 인풋', {
    errors,
    data: watch(),
  });

  return (
    <S.FormContainer>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.FormField>
          <S.FormInput
            type="text"
            id="title"
            label="제목"
            {...register('title')}
            placeholder="제목을 입력해주세요."
            watchedValue={watchedTitle}
            errorMessage={
              (touchedFields.title && errors.title && errors.title.message) ||
              ''
            }
          />
        </S.FormField>
        <S.FormField>
          <S.FormInput
            type="text"
            id="description"
            label="소개"
            {...register('description')}
            placeholder="플레이리스트를 소개해주세요."
            watchedValue={watchedDescription}
            errorMessage={
              (touchedFields.description &&
                errors.description &&
                errors.description.message) ||
              ''
            }
          />
        </S.FormField>
        <Select
          type="category"
          value={category}
          onChange={(value) => setCategory(value)}
        />
        <ContentsHashtag />
        <S.SubmitButton>저장</S.SubmitButton>
      </S.Form>
    </S.FormContainer>
  );
};

export default EditContents;
