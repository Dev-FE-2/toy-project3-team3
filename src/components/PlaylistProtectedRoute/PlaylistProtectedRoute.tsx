import { Outlet, useParams } from 'react-router-dom';
import { useAuth, useFetchPlaylistById } from '@/hooks';
import { useSetAtom } from 'jotai';
import { editModeAtom } from '@/atoms';

const ProtectedRoute = () => {
  const { playListId } = useParams();
  const { user } = useAuth();
  const { data: playlistData } = useFetchPlaylistById(playListId || '');
  const setPlaylists = useSetAtom(editModeAtom);

  if (playListId) {
    setPlaylists('modify');
  }

  if (user && playlistData && user.userId !== playlistData[0].user_id) {
    throw new Error('잘못된 접근입니다.');
  }

  return <Outlet />;
};

export default ProtectedRoute;
