import styled from 'styled-components';
import { GoVideo } from 'react-icons/go';

export const PlayListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`;

export const TumbnailContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const TumbnailLayer1 = styled.div`
  position: absolute;
  top: -10px;
  right: 7.5px;
  background-color: ${({ theme }) => theme.colors.gray.light};
  width: 97%;
  aspect-ratio: 16/9;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  z-index: -1;
`;

export const TumbnailLayer2 = styled.div`
  position: absolute;
  top: -18px;
  right: 16px;
  width: 93%;
  aspect-ratio: 16/9;
  background-color: ${({ theme }) => theme.colors.gray.extraLight};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  z-index: -2;
`;

export const ThumbnailWraper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
`;

export const Tumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const VideoCntWrapper = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.space.sm};
  right: ${({ theme }) => theme.space.sm};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => theme.space.xsm};
  background: rgba(0, 0, 0, 0.5);
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

export const VideoIcon = styled(GoVideo)`
  color: ${({ theme }) => theme.colors.white};
`;

export const VideoCnt = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.xsm};
`;

export const PlayListInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PlayListInfoLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`;

export const UserName = styled.span``;

export const UpdateDate = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray.light};
`;

export const PlayListTitle = styled.h3`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
