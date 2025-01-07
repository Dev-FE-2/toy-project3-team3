import { AvatarSize } from '@/types/common';
import styled from 'styled-components';

export const AvatarBtn = styled.button<{ size: AvatarSize }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => (size === 'small' ? '30px' : '50px')};
  height: ${({ size }) => (size === 'small' ? '30px' : '50px')};
  border-radius: ${({ theme }) => theme.borderRadius.xlg};
  overflow: hidden;
  &:hover img {
    transform: scale(1.1);
  }
`;

export const AvatarImg = styled.img`
  width: 100%;
  height: 100%; /* 버튼 내부 이미지를 가득 채우기 */
  object-fit: cover;
  transition: transform 0.3s;
`;
