import styled from 'styled-components';

export const VideoContainer = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => theme.space.xsm} 0;

  &.dragging {
    opacity: 0.5;
    transform: scale(0.95);
    transition:
      opacity 0.2s,
      transform 0.2s;
  }

  &.drop-target-top {
    border-top: 1px dashed #007bff;
  }

  &.drop-target-bottom {
    border-bottom: 1px dashed #007bff;
  }
`;

export const VideoThumbnail = styled.img`
  width: 128px;
  height: 72px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  object-fit: cover;
`;

export const VideoInfoContainer = styled.div`
  width: 100%;
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
  -webkit-line-clamp: 2;
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

export const VideoDragWrapper = styled.div`
  width: 20px;
  height: 72px;
  margin-right: -${({ theme }) => theme.space.sm};
  display: flex;
  align-items: center;
`;

export const VideoDeleteWrapper = styled.div`
  width: 20px;
  margin-left: -${({ theme }) => theme.space.sm};
`;
