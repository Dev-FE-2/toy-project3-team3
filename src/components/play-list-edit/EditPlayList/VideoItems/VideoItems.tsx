import * as S from './VideoItems.styles';
import { Icon } from '@/components/common';
import type { Video } from '@/types';

interface VideoItemsProps {
  video: Video;
  isPlayList?: boolean;
  onVideoClick?: (video: Video) => void;
  onRemove?: (e: React.MouseEvent, videoId: string) => void;
  dragProps?: {
    ref: (el: HTMLDivElement | null) => void;
    onDragStart: (e: React.DragEvent) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
    onDragEnd: () => void;
  };
}

export const VideoItems = ({
  video,
  isPlayList = false,
  onVideoClick,
  onRemove,
  dragProps,
}: VideoItemsProps) => {
  return (
    <S.VideoContainer
      onClick={() => onVideoClick?.(video)}
      draggable={isPlayList}
      {...dragProps}
      isPlayList={isPlayList}
    >
      {isPlayList && (
        <S.VideoDragWrapper>
          <Icon type="drag" />
        </S.VideoDragWrapper>
      )}
      <S.VideoThumbnail src={video.thumbnail} alt={video.title} />
      <S.VideoInfoContainer>
        <S.VideoTitle>{video.title}</S.VideoTitle>
        <S.VideoChannel>{video.channelTitle}</S.VideoChannel>
      </S.VideoInfoContainer>
      {onRemove ? (
        <S.VideoIconWrapper onClick={(e) => onRemove(e, video.id)}>
          <Icon type="cancel" />
        </S.VideoIconWrapper>
      ) : (
        <S.VideoIconWrapper>
          <Icon type="add" />
        </S.VideoIconWrapper>
      )}
    </S.VideoContainer>
  );
};

export default VideoItems;
