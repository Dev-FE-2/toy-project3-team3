import styled from 'styled-components';
import { FloatingLabelProps, StyledInputProps } from '@/types/common';

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
    $isActive ||
    document.activeElement ===
      document.querySelector('input:not(:placeholder-shown)')
      ? `
      top: -${theme.space.sm};
      font-size: ${theme.fontSize.xsm};
      background-color: ${theme.colors.background};
      color: ${$errorMessage ? theme.colors.error : theme.colors.primary}};
      `
      : `
      top: 50%;
      transform: translateY(-50%);
    `}
`;

export const StyledInput = styled.input<StyledInputProps>`
  padding: ${({ theme }) => theme.space.sm};
  border: 1px solid
    ${({ $errorMessage, theme }) =>
      $errorMessage ? theme.colors.error : theme.colors.gray.dark};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  &:focus {
    outline: 1px solid
      ${({ $errorMessage, theme }) =>
        $errorMessage ? theme.colors.error : theme.colors.primary};
    ${FloatingLabel};
  }
`;

export const StyledTextarea = styled.textarea`
  resize: none;
  border: 1px solid ${({ theme }) => theme.colors.gray.dark};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.space.sm};
  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

export const ErrorMessage = styled.p`
  position: absolute;
  bottom: -17px;
  left: ${({ theme }) => theme.space.xxsm};
  font-size: ${({ theme }) => theme.fontSize.xsm};
  color: ${({ theme }) => theme.colors.error};
`;
