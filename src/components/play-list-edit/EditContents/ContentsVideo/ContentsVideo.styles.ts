import styled from 'styled-components';

export const VideoWrapper = styled.ul`
  width: 100%;
`;

export const VideoContainer = styled.li`
  width: 100%;
  display: flex;
  flex: 1;
  gap: 10px;
  margin-bottom: ${({ theme }) => theme.space.sm};

  &.dragging {
    opacity: 0.5;
    transform: scale(0.95);
    transition:
      opacity 0.2s,
      transform 0.2s;
  }

  &.drop-target {
    border: 2px dashed #007bff;
    background-color: #f0f8ff;
  }
`;

export const VideoThumbnail = styled.img`
  width: 160px;
  height: 90px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  object-fit: cover;
`;

export const VideoInfoContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;

export const VideoTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const VideoChannel = styled.div`
  width: 50%;
  font-size: ${({ theme }) => theme.fontSize.xsm};
  color: ${({ theme }) => theme.colors.gray.medium};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
