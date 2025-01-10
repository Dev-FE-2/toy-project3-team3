import styled from 'styled-components';
import { FormStyle } from '@/components';
import { Button } from '@/components';
import { FcGoogle } from 'react-icons/fc';

export const SignInFormContainer = FormStyle.FormContainer;

export const SignInFormTitle = FormStyle.FormTitle;

export const SignInForm = FormStyle.Form;

export const { FormField, FormInput, SubmitButton, ToOtherPageText } =
  FormStyle;

export const OtherSignInText = styled.div`
  align-self: flex-start;
  margin-top: ${({ theme }) => theme.space.lg};
  width: 100%;
  text-align: left;
  padding-bottom: ${({ theme }) => theme.space.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.white};
`;

export const GoogleSignInBtn = styled(Button)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
`;

export const GoogleBtnTextWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  align-items: center;
  justify-content: center;
`;

export const GoogleIcon = styled(FcGoogle)``;
