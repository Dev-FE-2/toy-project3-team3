import { Input, FormStyle } from '@/components/common';
import styled from 'styled-components';

export const ContentsForm = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`;

export const ContentsInput = styled(Input)`
  width: 100%;
  /* border-color: ${({ theme }) => theme.colors.gray.medium};
  &:focus {
    border: none;
  } */
`;

export const {
  FormContainer,
  FormTitle,
  Form,
  FormField,
  FormInput,
  FormInputw,
  SubmitButton,
  ToOtherPageText,
} = FormStyle;
