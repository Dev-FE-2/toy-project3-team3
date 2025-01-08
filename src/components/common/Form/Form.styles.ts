import styled from 'styled-components';
import { Button, Input } from '@/components';

export const FormContainer = styled.section`
  width: 100%;
  text-align: center;
`;

export const FormTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space.lg};
`;

export const FormField = styled.div`
  width: 100%;
`;

export const InputwithDuplicateBtn = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  width: 100%;
  align-items: center;
`;

export const FormInputw = styled(Input)`
  width: 100%;
  flex: 1;
`;

export const DuplicateCheckBtn = styled(Button)`
  width: auto;
`;

export const FormInput = styled(Input)`
  width: 100%;
`;

export const SubmitButton = styled(Button)`
  width: 100%;
`;

export const ToOtherPageText = styled.a`
  margin-top: ${({ theme }) => theme.space.md};
  display: block;
  color: ${({ theme }) => theme.colors.gray.dark};
  text-decoration: underline;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.gray.extraDark};
  }
`;
