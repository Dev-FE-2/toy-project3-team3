import { CategoryType } from '@/types';
import { z } from 'zod';

const categorySchema = z.string().refine(
  (value) => {
    const validCategory: CategoryType[] = [
      'korean',
      'chinese',
      'western',
      'japanese',
      'fusion',
      'southeast',
      'middleEast',
      'southAmerica',
      'northEurope',
      'africa',
      'indian',
    ];

    return validCategory.includes(value as CategoryType);
  },
  {
    message: '유효한 카테고리를 선택해주세요.',
  },
);

export const playListEditSchema = z.object({
  title: z
    .string()
    .min(1, '제목을 입력해주세요.')
    .max(100, '제목은 100자 이내로 입력해주세요.'),
  description: z
    .string()
    .min(1, '플레이리스트 소개를 입력해주세요.')
    .max(200, '소개는 200자 이내로 입력해주세요.'),
  category: categorySchema,
});
