import { z } from 'zod';

export const playListEditSchema = z.object({
  title: z
    .string()
    .min(1, '제목을 입력해주세요.')
    .max(50, '제목은 50자 이내로 입력해주세요.'),
  description: z
    .string()
    .min(1, '플레이리스트 소개를 입력해주세요.')
    .max(200, '소개는 200자 이내로 입력해주세요.'),
});
