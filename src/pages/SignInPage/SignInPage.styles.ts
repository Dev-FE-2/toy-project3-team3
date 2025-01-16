import styled from 'styled-components';
import { FormStyle } from '@/components';
import { Button } from '@/components';
import { FcGoogle } from 'react-icons/fc';

export const SignpInageContainer = FormStyle.FormContainer;

export const SignInForm = FormStyle.Form;

export const {
  Logo,
  FormField,
  FormInput,
  SubmitButtonContainer,
  SubmitButton,
  ToOtherPageText,
} = FormStyle;

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
