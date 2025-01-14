import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './PlaylistContents.styles';
import CommentList from '@/components/playlist/PlaylistContents/CommentList/CommentList';
import VideoList from '@/components/playlist/PlaylistContents/VideoList/VideoList';

const PlaylistContents = () => {
  const loc = useLocation();
  const nav = useNavigate();

  const searchParams = new URLSearchParams(loc.search);
  const tab = searchParams.get('tab');

  const handleTabChange = (newTab: string) => {
    searchParams.set('tab', newTab);
    nav(`${loc.pathname}?${searchParams.toString()}`);
  };

  return (
    <>
      <S.TabsContainer>
        <S.ListContainer>
          <S.Btn onClick={() => handleTabChange('playlists')}>
            <S.TabText $isActive={tab === 'playlists'}>영상</S.TabText>
          </S.Btn>
          <S.Btn onClick={() => handleTabChange('comments')}>
            <S.TabText $isActive={tab === 'comments'}>댓글</S.TabText>
          </S.Btn>
        </S.ListContainer>
      </S.TabsContainer>
      {tab === 'playlists' && <VideoList />}
      {tab === 'comments' && <CommentList />}
    </>
  );
};

export default PlaylistContents;
