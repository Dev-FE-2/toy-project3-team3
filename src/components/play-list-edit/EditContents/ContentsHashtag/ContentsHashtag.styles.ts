import { FormStyle } from '@/components/common';
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
`;

export const InputAndButtonContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
`;

export const HashtagAndIconContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.sm};
  width: 100%;
`;

export const HashtagContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  max-width: 102px;
`;

export const Hashtags = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xsm};
  color: ${({ theme }) => theme.colors.gray.medium};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Error = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xsm};
  color: ${({ theme }) => theme.colors.error};
`;

export const { FormField, FormInput } = FormStyle;
