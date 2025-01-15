import styled from 'styled-components';
import { Button, Input } from '@/components';
import { GRAM_LOGO } from '@/constants';

export const FormContainer = styled.section`
  text-align: center;
`;

export const Logo = styled.img.attrs({
  src: GRAM_LOGO,
  alt: 'Gram Logo',
})`
  height: 100px;
  width: auto;
  margin: 0 auto ${({ theme }) => theme.space.md};
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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.md};
`;

export const FormInputw = styled(Input)`
  width: 100%;
  flex: 1;
`;

export const DuplicateCheckBtn = styled(Button)`
  flex-shrink: 0;
  white-space: nowrap;
`;

export const FormInput = styled(Input)`
  width: 100%;
`;

export const SubmitButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
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
