import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as S from './PlaylistContents.styles';
import CommentList from '@/components/playlist/PlaylistContents/CommentList/CommentList';
import VideoList from '@/components/playlist/PlaylistContents/VideoList/VideoList';
import ContentsInfo from '@/components/playlist/PlaylistContents/ContentsInfo/ContentsInfo';
import {
  useFetchCommentByTargetPlaylistId,
  useFetchPlaylistById,
  useFetchPlaylistVideoByPlaylistId,
} from '@/hooks';

const PlaylistContents = () => {
  const { playlistId } = useParams();
  const loc = useLocation();
  const nav = useNavigate();

  const { data: playlistData } = useFetchPlaylistById(playlistId || '');
  const { data: commentData } = useFetchCommentByTargetPlaylistId(
    playlistId || '',
  );
  const { data: playlistVideoData } = useFetchPlaylistVideoByPlaylistId(
    playlistId || '',
  );

  if (!playlistData || !commentData || !playlistVideoData)
    return <div>에러</div>; // 📌 로딩 처리 필요~~

  const searchParams = new URLSearchParams(loc.search);
  const tab = searchParams.get('tab');
  const target = searchParams.get('target');

  const handleTabChange = (newTab: string) => {
    if (tab !== newTab || target) {
      searchParams.set('tab', newTab);
      searchParams.delete('target');
      nav(`${loc.pathname}?${searchParams.toString()}`);
    }
  };

  return (
    <S.PlaylistContentsWrapper>
      <ContentsInfo playlistId={playlistId!} />
      <S.TabsContainer>
        <S.ListContainer>
          <S.Btn onClick={() => handleTabChange('playlists')}>
            <S.TabText $isActive={tab === 'playlists'}>
              영상 {playlistVideoData.length}
            </S.TabText>
          </S.Btn>
          <S.Btn onClick={() => handleTabChange('comments')}>
            <S.TabText $isActive={tab === 'comments'}>
              댓글 {commentData.length}
            </S.TabText>
          </S.Btn>
        </S.ListContainer>
      </S.TabsContainer>
      {tab === 'playlists' && <VideoList />}
      {tab === 'comments' && <CommentList />}
    </S.PlaylistContentsWrapper>
  );
};

export default PlaylistContents;
