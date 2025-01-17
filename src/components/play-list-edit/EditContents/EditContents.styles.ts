import { FormStyle } from '@/components/common';
import styled from 'styled-components';

export const ContentsForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`;

export const { FormInput } = FormStyle;
