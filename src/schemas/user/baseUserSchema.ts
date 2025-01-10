import { z } from 'zod';
import {
  NICKNAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from '@/constants';

export const baseUserSchema = z.object({
  nickname: z
    .string()
    .trim()
    .min(1, { message: '닉네임을 입력해주세요' })
    .max(NICKNAME_MAX_LENGTH, {
      message: `닉네임은 ${NICKNAME_MAX_LENGTH}자 이하로 입력해주세요`,
    })
    .refine((value) => /^[a-zA-Z0-9가-힣._-]+$/.test(value), {
      message: '닉네임은 영문, 한글, 숫자, 특수문자(._-)만 사용 가능합니다',
    }),
  email: z
    .string()
    .trim()
    .min(1, { message: '이메일을 입력해주세요' })
    .max(EMAIL_MAX_LENGTH, {
      message: `이메일은 ${EMAIL_MAX_LENGTH}자 이하로 입력해주세요`,
    })
    .email({ message: '유효한 이메일을 입력해주세요' }),
  password: z
    .string()
    .trim()
    .min(1, { message: '비밀번호를 입력해주세요' })
    .min(
      PASSWORD_MIN_LENGTH,
      `비밀번호는 ${PASSWORD_MIN_LENGTH}자리 이상 입력해주세요`,
    )
    .max(PASSWORD_MAX_LENGTH, {
      message: `비밀번호는 ${PASSWORD_MAX_LENGTH}자 이하로 입력해주세요`,
    })
    .refine((value) => /^[a-zA-Z0-9]+$/.test(value), {
      message: '비밀번호는 영문과 숫자만 사용 가능합니다',
    }),
  confirmPassword: z
    .string()
    .trim()
    .min(1, { message: '비밀번호를 한 번 더 입력해주세요' }),
});
