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
`;

export const { FormContainer, FormInput } = FormStyle;
