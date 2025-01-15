import { z } from 'zod';
import {
  NICKNAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  SHORT_INTRO_MAX_LENGTH,
} from '@/constants';

export const editProfileSchema = z
  .object({
    nickname: z
      .string()
      .max(NICKNAME_MAX_LENGTH, {
        message: `닉네임은 ${NICKNAME_MAX_LENGTH}자 이하로 입력해주세요`,
      })
      .optional(),
    shortIntro: z
      .string()
      .max(NICKNAME_MAX_LENGTH, {
        message: `한줄 소개는 ${SHORT_INTRO_MAX_LENGTH}자 이하로 입력해주세요`,
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
  .superRefine((data, ctx) => {
    if (data.nickname && !/^[a-zA-Z0-9ㄱ-ㅎ가-힣._-]+$/.test(data.nickname)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '영문, 한글, 숫자, . _ - 만 사용 가능해요',
        path: ['nickname'],
      });
    }

    if (data.password) {
      if (!/^[a-zA-Z0-9]+$/.test(data.password)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `비밀번호는 영문과 숫자만 사용 가능합니다`,
          path: ['password'],
        });
      }
      if (data.password.length < PASSWORD_MIN_LENGTH) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `비밀번호는 ${PASSWORD_MIN_LENGTH}자리 이상 입력해주세요`,
          path: ['password'],
        });
      }
    }
    // password가 있을 때 confirmPassword 체크
    if (data.password && !data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '비밀번호를 한번 더 입력해주세요',
        path: ['confirmPassword'],
      });
    }

    // password와 confirmPassword 일치 여부 체크
    if (
      data.password &&
      data.confirmPassword &&
      data.password !== data.confirmPassword
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '비밀번호가 일치하지 않습니다',
        path: ['confirmPassword'],
      });
    }
  });

export type EditProfileFormValues = z.infer<typeof editProfileSchema>;
