import { z } from 'zod';
import {
  NICKNAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from '@/constants';

export const editProfileSchema = z
  .object({
    nickname: z
      .string()
      .max(NICKNAME_MAX_LENGTH, {
        message: `닉네임은 ${NICKNAME_MAX_LENGTH}자 이하로 입력해주세요`,
      })
      .optional(),
    password: z
      .string()
      .max(PASSWORD_MAX_LENGTH, {
        message: `비밀번호는 ${PASSWORD_MAX_LENGTH}자 이하로 입력해주세요`,
      })
      .optional(),
    confirmPassword: z.string().optional(),
    profileImage: z.string().optional(),
  })
  .refine(
    (data) => !data.password || data.password.length >= PASSWORD_MIN_LENGTH,
    {
      message: `비밀번호는 ${PASSWORD_MIN_LENGTH}자리 이상 입력해주세요`,
      path: ['password'],
    },
  )
  .refine(
    (data) =>
      !data.password ||
      !data.confirmPassword ||
      data.password === data.confirmPassword,
    {
      message: '비밀번호가 일치하지 않습니다',
      path: ['confirmPassword'],
    },
  );

export type EditProfileFormValues = z.infer<typeof editProfileSchema>;
