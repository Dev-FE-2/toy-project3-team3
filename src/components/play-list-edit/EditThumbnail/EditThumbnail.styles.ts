import styled from 'styled-components';

export const ThumbnailWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.space.xsm};
`;

export const ThumbnailPreviewWrapper = styled.div`
  width: 300px;
  height: 200px;
`;

export const ThumbnailPreview = styled.img`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  object-fit: cover;
`;

export const FileInput = styled.input`
  display: none;
`;
