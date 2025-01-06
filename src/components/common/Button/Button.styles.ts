import styled, { css } from 'styled-components';
import { StyledBtnProps, StyledPlusBtnProps } from '@/types/common';
import { HiPlus } from 'react-icons/hi';

// 공동 disabled 스타일
const disabledStyle = css`
  cursor: not-allowed;
  pointer-events: none;
  background-color: ${({ theme }) => theme.colors.gray.extraDark};
`;

// 공동 hover 스타일
const hoverStyle = css`
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.opacity.darken1};
    pointer-events: none;
  }
`;

const colorStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary};
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.secondary};
  `,
  gray: css`
    background-color: ${({ theme }) => theme.colors.gray.light};
  `,
};

const sizeStyles = {
  small: css`
    font-size: ${({ theme }) => theme.fontSize.xsm};
  `,
  medium: css`
    font-size: ${({ theme }) => theme.fontSize.sm};
  `,
};

const borderTypeStyles = {
  square: css`
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  `,
  round: css`
    border-radius: ${({ theme }) => theme.borderRadius.lg};
  `,
  circle: css``,
};

export const StyledPlusBtn = styled(HiPlus)<StyledPlusBtnProps>`
  border-radius: ${({ theme }) => theme.borderRadius.xlg};
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  transition: background-color 0.3s;
  &:hover {
    ${hoverStyle}
  }
  &:disabled {
    ${disabledStyle}
  }
`;

export const StyledBtn = styled.button<StyledBtnProps>`
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.space.sm};
  position: relative;
  transition: background-color 0.3s;
  &:hover {
    ${hoverStyle}
  }
  &:disabled {
    ${disabledStyle}
  }

  ${({ $color }) => $color && colorStyles[$color]}
  ${({ $borderType }) => $borderType && borderTypeStyles[$borderType]}
  ${({ $size }) => $size && sizeStyles[$size]}
`;
