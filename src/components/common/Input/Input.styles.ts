import styled from 'styled-components';
import { FloatingLabelProps, StyledInputProps } from '@/types';

export const InputWrapper = styled.div`
  position: relative;
`;

export const FloatingLabel = styled.span<FloatingLabelProps>`
  pointer-events: none;
  font-size: ${({ theme }) => theme.fontSize.sm};
  position: absolute;
  left: ${({ theme }) => theme.space.sm};
  transition: all 0.3s;
  ${({ $isActive, $errorMessage, theme }) =>
    $isActive
      ? `
      top: -${theme.space.sm};
      font-size: ${theme.fontSize.xsm};
      background-color: ${theme.colors.background};
      color: ${$errorMessage ? theme.colors.error : theme.colors.gray}};
      `
      : `
      top: 50%;
      transform: translateY(-50%);
  `}
`;

export const StyledTextInput = styled.input<StyledInputProps>`
  padding: ${({ theme }) => theme.space.sm};
  border: 1px solid
    ${({ $errorMessage, theme }) =>
      $errorMessage ? theme.colors.error : theme.colors.gray.dark};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  &:focus {
    outline: 1px solid
      ${({ $errorMessage, theme }) =>
        $errorMessage ? theme.colors.error : theme.colors.primary};
    border-color: ${({ $errorMessage, theme }) =>
      $errorMessage ? theme.colors.error : theme.colors.primary};
    ${FloatingLabel};
  }
`;

export const StyledTextarea = styled.textarea<StyledInputProps>`
  resize: none;
  border: 1px solid
    ${({ $errorMessage, theme }) =>
      $errorMessage ? theme.colors.error : theme.colors.gray.dark};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.space.sm};
  &:focus {
    outline: 1px solid
      ${({ $errorMessage, theme }) =>
        $errorMessage ? theme.colors.error : theme.colors.primary};
    border-color: ${({ $errorMessage, theme }) =>
      $errorMessage ? theme.colors.error : theme.colors.primary};
  }
`;

export const BaseMessage = styled.p<StyledInputProps>`
  position: absolute;
  bottom: -19px;
  left: ${({ theme }) => theme.space.xxsm};
  font-size: ${({ theme }) => theme.fontSize.xsm};
  color: ${({ $errorMessage, theme }) =>
    $errorMessage ? theme.colors.error : theme.colors.gray.medium};
`;

export const TextAreaErrorMessage = styled(BaseMessage)`
  bottom: -13px;
`;
