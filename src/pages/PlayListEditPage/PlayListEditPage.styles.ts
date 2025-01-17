import { FormStyle } from '@/components';
import styled from 'styled-components';

export const PlayListEditPageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-top: ${({ theme }) => theme.space.sm};
`;

export const Form = styled.form`
  width: 85%;
`;

export const { SubmitButton } = FormStyle;
